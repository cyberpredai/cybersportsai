import { NextResponse } from "next/server";

const API_URL = "https://api.pandascore.co/matches/upcoming";
const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  data: unknown;
};

let cache: CacheEntry | null = null;
let inFlight: Promise<unknown> | null = null;

async function fetchUpcomingMatches() {
  const apiKey = process.env.PANDASCORE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PANDASCORE_API_KEY");
  }

  const params = new URLSearchParams({
    "filter[videogame]": "cs2,dota-2,valorant",
  });
  params.set("token", apiKey);

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    const text = await response.text();
    return {
      error: `PandaScore error: ${response.status}`,
      detail: text,
      status: response.status,
    };
  }

  return response.json();
}

export async function GET() {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return NextResponse.json(cache.data);
  }

  if (!inFlight) {
    inFlight = fetchUpcomingMatches()
      .then((data) => {
        if (data && typeof data === "object" && "error" in data) {
          return data;
        }
        cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
        return data;
      })
      .finally(() => {
        inFlight = null;
      });
  }

  try {
    const data = await inFlight;
    if (data && typeof data === "object" && "error" in data) {
      const status = (data as { status?: number }).status ?? 502;
      return NextResponse.json(data, { status });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

type Opponent = {
  opponent?: {
    name?: string;
    image_url?: string | null;
  };
};

type League = {
  name?: string;
};

type Match = {
  name?: string;
  begin_at?: string | null;
  league?: League | null;
  opponents?: Opponent[];
  odds?: unknown;
};

function formatTime(value?: string | null) {
  if (!value) return "TBD";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatMatchTicker(match: Match) {
  const league = match.league?.name ?? "Unknown League";
  const opponents = match.opponents
    ?.map((item) => item.opponent?.name)
    .filter(Boolean);

  const name =
    opponents && opponents.length >= 2
      ? `${opponents[0]} vs ${opponents[1]}`
      : match.name ?? "TBD";

  const odds = formatOdds(match);
  const oddsSuffix = odds === "CALCULATING..." ? "" : ` | ODDS: ${odds}`;

  return `[${league}] ${name} — ${formatTime(match.begin_at)}${oddsSuffix}`;
}

function formatOdds(match: Match) {
  const odds = match.odds;

  if (typeof odds === "number") {
    return odds.toFixed(2);
  }

  if (Array.isArray(odds)) {
    const formatted = odds
      .map((item) => {
        if (typeof item === "number") {
          return item.toFixed(2);
        }
        if (item && typeof item === "object") {
          const value =
            (item as { value?: number; odd?: number; odds?: number }).value ??
            (item as { odd?: number }).odd ??
            (item as { odds?: number }).odds;
          if (typeof value !== "number") return null;

          const label =
            (item as { name?: string }).name ??
            (item as { team?: string }).team ??
            (item as { opponent?: { name?: string } }).opponent?.name;

          return label ? `${label} ${value.toFixed(2)}` : value.toFixed(2);
        }
        return null;
      })
      .filter(Boolean);

    if (formatted.length) {
      return formatted.join(" / ");
    }
  }

  return "CALCULATING...";
}

export type { Match };

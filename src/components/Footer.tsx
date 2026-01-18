"use client";

import { useEffect, useState } from "react";
import { SocialLinks } from "./SocialLinks";
import { formatMatchTicker, type Match } from "@/lib/ticker";

const fallbackText =
  "LIVE ANALYSIS: NAVI vs FAZE - WIN PROBABILITY 64% | SOLANA MAINNET: ACTIVE";

export function Footer() {
  const [marqueeText, setMarqueeText] = useState(fallbackText);

  useEffect(() => {
    let isMounted = true;

    const loadMatches = async () => {
      try {
        const response = await fetch("/api/esports/matches");
        if (!response.ok) return;
        const data = (await response.json()) as Match[];
        if (!Array.isArray(data) || data.length === 0) return;

        const formatted = data
          .slice(0, 6)
          .map((match) => formatMatchTicker(match))
          .join(" | ");

        if (isMounted && formatted) {
          setMarqueeText(formatted);
        }
      } catch {
        // Keep fallback on error
      }
    };

    loadMatches();
    const interval = setInterval(loadMatches, 60_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="absolute bottom-6 w-full text-center">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="mb-6 flex justify-center md:hidden">
          <SocialLinks />
        </div>
        <div className="overflow-hidden rounded-full border border-white/10 bg-black/40 py-3">
          <div className="marquee">
            <span>{marqueeText}</span>
            <span aria-hidden="true">{marqueeText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

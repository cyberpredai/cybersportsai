"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectButton } from "./ConnectButton";

export function Hero() {
  const fullText =
    "LIVE: AI models stream predictive win probabilities, liquidity heatmaps, and risk alerts directly into your wallet.";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-24 pt-6 text-center sm:px-10 sm:text-left">
      <h1 className="font-display text-3xl leading-tight text-white sm:text-5xl lg:text-8xl">
        Predictive esports intelligence for Solana-native markets.
      </h1>
      <div className="font-space relative max-w-2xl rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-slate-100 shadow-[0_0_25px_rgba(20,241,149,0.12)] backdrop-blur sm:text-base">
        <p className="relative">
          {typedText}
          <span className="typewriter-cursor" />
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
        <ConnectButton
          label="Launch Arena"
          className="w-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] sm:w-auto"
        />
        <WalletMultiButton className="!w-full !rounded-full !bg-gradient-to-r !from-[#9945FF] !to-[#14F195] !px-8 !py-4 !text-sm !font-semibold !uppercase !tracking-[0.3em] !text-black !shadow-[0_0_25px_rgba(153,69,255,0.6)] transition-all duration-200 hover:!scale-105 hover:!shadow-[0_0_35px_rgba(153,69,255,0.9)] sm:!w-auto" />
        <a
          href="https://github.com/cyberpredai/cybersportsai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white/80 hover:text-white/95 sm:w-auto"
        >
          View Docs
        </a>
      </div>
    </section>
  );
}

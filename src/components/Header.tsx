"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SocialLinks } from "./SocialLinks";

export function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-6 sm:px-10">
      <div className="font-unbounded text-xs uppercase tracking-[0.4em] text-white">
        <span className="glitch" data-text="CyberPredict AI">
          CyberPredict AI
        </span>
      </div>
      <div className="flex items-center gap-6">
        <SocialLinks className="hidden md:block" />
        <WalletMultiButton className="!rounded-full !bg-gradient-to-r !from-[#9945FF] !to-[#14F195] !px-5 !py-2 !text-xs !font-semibold !uppercase !tracking-[0.3em] !text-black !shadow-[0_0_25px_rgba(153,69,255,0.6)] transition-all duration-200 hover:!scale-105 hover:!shadow-[0_0_35px_rgba(153,69,255,0.9)]" />
      </div>
    </header>
  );
}

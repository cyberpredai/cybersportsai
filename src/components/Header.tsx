"use client";

import { SocialLinks } from "./SocialLinks";
import { ConnectButton } from "./ConnectButton";

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
        <ConnectButton
          label="Connect Wallet"
          showAddress
          className="px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
        />
      </div>
    </header>
  );
}

"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const baseClasses =
  "rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black shadow-[0_0_25px_rgba(153,69,255,0.6)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_35px_rgba(153,69,255,0.9)]";

export function ConnectButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (!connected) {
      setVisible(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${className ?? ""}`}
    >
      {label}
    </button>
  );
}

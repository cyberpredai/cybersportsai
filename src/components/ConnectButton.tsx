"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { WalletConnectWalletName } from "@solana/wallet-adapter-walletconnect";

const baseClasses =
  "rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black shadow-[0_0_25px_rgba(153,69,255,0.6)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_35px_rgba(153,69,255,0.9)]";

export function ConnectButton({
  label,
  className,
  showAddress,
}: {
  label: string;
  className?: string;
  showAddress?: boolean;
}) {
  const { connected, publicKey, select, connect } = useWallet();
  const { setVisible } = useWalletModal();

  const isMobile =
    typeof window !== "undefined" &&
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );

  const displayLabel =
    showAddress && connected && publicKey
      ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
          .toBase58()
          .slice(-4)}`
      : label;

  const handleClick = async () => {
    if (connected) return;

    if (isMobile) {
      try {
        select(WalletConnectWalletName);
        await connect();
        return;
      } catch {
        // Fall back to modal
      }
    }

    setVisible(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${className ?? ""}`}
    >
      {displayLabel}
    </button>
  );
}

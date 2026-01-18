"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export function WalletConnectTracker() {
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (!connected || !publicKey) return;
    if (typeof window === "undefined") return;

    const address = publicKey.toBase58();
    const storageKey = `wallet-connect-notified:${address}`;

    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");

    fetch("/api/telemetry/wallet-connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
      keepalive: true,
    }).catch(() => {
      // Ignore telemetry errors
    });
  }, [connected, publicKey]);

  return null;
}

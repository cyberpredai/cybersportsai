"use client";

import { useMemo, type ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  type WalletAdapter,
  WalletAdapterNetwork,
} from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletConnectTracker } from "@/components/WalletConnectTracker";

const network = WalletAdapterNetwork.Devnet;
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  process.env.WALLET_CONNECT_PROJECT_ID;

export function Providers({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(() => {
    const adapters: WalletAdapter[] = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ];

    if (walletConnectProjectId) {
      adapters.push(
        new WalletConnectWalletAdapter({
          network,
          options: {
            projectId: walletConnectProjectId,
            metadata: {
              name: "CyberPredict AI",
              description: "CyberPredict AI wallet connection",
              url: "https://zerotohero.today",
              icons: ["https://zerotohero.today/favicon.ico"],
            },
          },
        })
      );
    }

    return adapters;
  }, [walletConnectProjectId]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
        <WalletConnectTracker />
      </WalletProvider>
    </ConnectionProvider>
  );
}

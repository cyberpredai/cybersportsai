import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CyberPredict AI",
  description:
    "Cyberpunk-grade prediction dApp on Solana with real-time AI insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${spaceMono.variable} antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/back.jpeg')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(5,10,20,0.2)_0%,_rgba(5,10,20,1)_90%)]" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

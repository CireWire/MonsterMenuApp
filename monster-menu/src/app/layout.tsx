import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GameStateProvider } from "@/contexts/GameStateContext";
import Layout from "@/components/layout/Layout";

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: "Monster Menu",
  description: "A digital adaptation of the Monster Menu tabletop role-playing game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cinzel.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8625420650623720"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={cinzel.className}>
        <GameStateProvider>
          <Layout>{children}</Layout>
        </GameStateProvider>
      </body>
    </html>
  );
}

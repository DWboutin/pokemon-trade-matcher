import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { currentOrigin } from "@/utils/contants";
import { Analytics } from "@vercel/analytics/react";
import { BodyStartScripts } from "@/components/body-start-scripts";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(currentOrigin!),
  title: "Pokemon TCG Pocket Trading | PokeSwap.io - Trade Cards & Connect with Players",
  description:
    "PokeSwap.io - The community platform for Pokemon TCG Pocket players to find, connect, and trade cards. Create trade listings, discover rare cards, and build your collection with fellow trainers.",
  openGraph: {
    title: "Pokemon TCG Pocket Trading | PokeSwap.io",
    description:
      "Find, connect and trade Pokemon TCG Pocket cards with fellow trainers. Create listings, discover rare cards & build your collection.",
    type: "website",
    url: currentOrigin,
    siteName: "PokeSwap.io",
    locale: "en_US",
    images: [
      {
        url: `${currentOrigin}/logos/pokeswap.png`,
        width: 1024,
        height: 1024,
        alt: "PokeSwap.io Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokemon TCG Pocket Trading | PokeSwap.io",
    description: "Find, connect and trade Pokemon TCG Pocket cards with fellow trainers",
    images: [`${currentOrigin}/logos/pokeswap.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className}antialiased`}>
        <BodyStartScripts />
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

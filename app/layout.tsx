import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Pokemon TCG Pocket Trading | PokeSwap.io - Trade Cards & Connect with Players",
  description:
    "PokeSwap.io - The community platform for Pokemon TCG Pocket players to find, connect, and trade cards. Create trade listings, discover rare cards, and build your collection with fellow trainers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className}antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

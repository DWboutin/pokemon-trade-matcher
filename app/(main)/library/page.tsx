import { Typography } from "@/components/typography";
import { currentOrigin } from "@/utils/contants";
import { Metadata } from "next";
import { LibraryCardsListing } from "@/features/library-cards-listing/library-cards-listing";
import { getSearchCards } from "@/utils/requests/get-search-cards";

export const metadata: Metadata = {
  title: "Pokemon TCG Pocket Trade Listings | Find & Trade Cards | PokeSwap.io",
  description:
    "Browse active Pokemon TCG Pocket trade listings on PokeSwap.io. Find rare cards, make offers, and complete trades with players worldwide. Easy card trading platform for Pokemon TCG Pocket collectors.",
  keywords:
    "Pokemon TCG Pocket trades, trading cards, card marketplace, Pokemon card trading, TCG Pocket exchange, rare Pokemon cards",
  openGraph: {
    title: "Pokemon TCG Pocket Trade Listings | PokeSwap.io",
    description:
      "Browse and create Pokemon TCG Pocket card trades. Find rare cards and connect with traders worldwide.",
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
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const cards = await getSearchCards(sp);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Typography variant="h1" text="Library" />

        <div className="flex flex-1 w-full flex-col gap-4">
          <div className="flex flex-col gap-10 max-md:px-4">
            <LibraryCardsListing cards={cards || []} defaultValues={sp} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Typography } from "@/components/typography";
import { TradesInfiniteListing } from "@/features/trades-listing/components/trades-infinite-listing";
import { TradesListingSearch } from "@/features/trades-listing/components/trades-listing-search";
import { getPaginatedTrades } from "@/utils/requests/get-paginated-trades";
import { currentOrigin } from "@/utils/contants";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

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

export default async function TradesPage() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const initialData = await getPaginatedTrades({
    page: 1,
    limit: 10,
    status: "pending",
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Typography variant="h1" text="Trades" />

        <div className="flex flex-1 w-full flex-col gap-4">
          <div className="flex flex-col gap-10 max-md:px-4">
            <TradesListingSearch />
            <TradesInfiniteListing initialData={initialData} status="pending" />
          </div>
        </div>
      </div>
    </div>
  );
}

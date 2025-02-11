import { Typography } from "@/components/typography";
import { TradesInfiniteListing } from "@/features/trades-listing/components/trades-infinite-listing";
import { TradesListingSearch } from "@/features/trades-listing/components/trades-listing-search";
import { getPaginatedTrades } from "@/utils/requests/get-paginated-trades";

export const dynamic = "force-dynamic";

export default async function TradesPage() {
  const initialData = await getPaginatedTrades({
    page: 1,
    limit: 10,
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Typography variant="h1" text="Trades" />

        <div className="flex flex-1 w-full flex-col gap-4">
          <TradesListingSearch />
          <TradesInfiniteListing initialData={initialData} />
        </div>
      </div>
    </div>
  );
}

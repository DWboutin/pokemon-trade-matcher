import { Typography } from "@/components/typography";
import { TradesListing } from "@/features/trades-listing/trades-listing";
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

        <TradesListing initialData={initialData} />
      </div>
    </div>
  );
}

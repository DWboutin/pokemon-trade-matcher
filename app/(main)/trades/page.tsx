import { getPaginatedTrades } from "@/actions/get-paginated-trades";
import { Typography } from "@/components/typography";
import { TradesListing } from "@/features/trades-listing/trades-listing";

export default async function TradesPage() {
  const { data: initialData, error } = await getPaginatedTrades(1, 10);

  if (error || !initialData) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Typography variant="h1" text="Trades" />

        <TradesListing initialData={initialData} />
      </div>
    </div>
  );
}

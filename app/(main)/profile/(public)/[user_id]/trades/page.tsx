import { Typography } from "@/components/typography";
import { Tabs } from "@/components/ui/tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { TradesInfiniteListing } from "@/features/trades-listing/components/trades-infinite-listing";
import { TradesListingSearch } from "@/features/trades-listing/components/trades-listing-search";
import { getPaginatedTrades } from "@/utils/requests/get-paginated-trades";

export const dynamic = "force-dynamic";

export default async function ProfileTradesPage({ params }: { params: { user_id: string } }) {
  const { user_id } = await params;
  const initialData = await getPaginatedTrades({
    page: 1,
    limit: 10,
    authorId: user_id,
    status: "pending",
  });

  return (
    <div className="flex flex-col gap-4 max-md:px-4">
      <div className="flex flex-col gap-4">
        <Typography variant="h2" text="Trades" />
        <TradesListingSearch />
      </div>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="all" className="text-lg font-semibold">
            All
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-lg font-semibold">
            Pending
          </TabsTrigger>
          <TabsTrigger value="ended" className="text-lg font-semibold">
            Ended
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TradesInfiniteListing initialData={initialData} authorId={user_id} />
        </TabsContent>
        <TabsContent value="pending">
          <TradesInfiniteListing initialData={initialData} authorId={user_id} status="pending" />
        </TabsContent>
        <TabsContent value="ended">
          <TradesInfiniteListing initialData={initialData} authorId={user_id} status="ended" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

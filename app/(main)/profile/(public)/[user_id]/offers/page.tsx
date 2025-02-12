import { getUserData } from "@/actions/get-user-data";
import { Typography } from "@/components/typography";
import { Tabs } from "@/components/ui/tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { OffersTableListing } from "@/features/offers-table-listing/offers-table-listing";
import { getPaginatedOffersForUserId } from "@/utils/requests/get-paginated-offers-for-user-id";

export default async function ProfileOffersPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  const user = await getUserData();
  const initialData = await getPaginatedOffersForUserId({
    page: 1,
    limit: 10,
    authorId: user_id,
  });

  return (
    <div className="flex flex-col gap-4 max-md:px-4">
      <div className="flex flex-col gap-4">
        <Typography variant="h2" text="Offers" />
      </div>
      <Tabs defaultValue="all" className="w-full">
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
          <OffersTableListing
            initialData={initialData}
            authorId={user_id}
            isOwner={user?.id === user_id}
          />
        </TabsContent>
        <TabsContent value="pending">Pending offers</TabsContent>
        <TabsContent value="ended">Ended offers</TabsContent>
      </Tabs>
    </div>
  );
}

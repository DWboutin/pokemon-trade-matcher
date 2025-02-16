import { getUserData } from "@/actions/get-user-data";
import { Typography } from "@/components/typography";
import { Tabs } from "@/components/ui/tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { NotificationsTableListing } from "@/features/notifications-table-listing/notifications-table-listing";
import { redirect } from "next/navigation";

export default async function ProfileNotificationsPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  const user = await getUserData();

  if (!user || user.id !== user_id) {
    return redirect(`/profile/${user_id}/trades`);
  }

  return (
    <div className="flex flex-col gap-4 max-md:px-4">
      <div className="flex flex-col gap-4">
        <Typography variant="h2" text="Notifications" />
      </div>
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="new" className="text-lg font-semibold">
            New
          </TabsTrigger>
          <TabsTrigger value="seen" className="text-lg font-semibold">
            Seen
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <NotificationsTableListing initialData={[]} status="new" />
        </TabsContent>
        <TabsContent value="seen">
          <NotificationsTableListing initialData={[]} status="seen" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

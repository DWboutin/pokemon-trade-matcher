import { FC } from "react";
import { HeaderNotificationPanelEntry } from "@/features/header/components/header-notification-panel-entry";
import Link from "next/link";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { InfiniteScrollListing } from "@/components/sections/infinite-scroll-listing/infinite-scroll-listing";
import { getUserPaginatedNotifications } from "@/utils/requests/get-user-paginated-notifications";

export const HeaderNotificationPanel: FC = () => {
  const user = useConnectedUserStore((state) => state.user);

  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-row gap-2 items-center justify-between">
          <p className="text-sm font-bold">Notifications</p>
          <Link
            href={`/profile/${user?.id}/notifications`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            View all
          </Link>
        </div>
        <div className="flex-1 overflow-hidden">
          <InfiniteScrollListing
            initialData={[]}
            queryKey={["notifications"]}
            paginationLimit={5}
            estimateSize={64}
            overscan={4}
            getPaginatedData={getUserPaginatedNotifications}
            emptyResultComponent={<p className="text-sm text-muted-foreground">No notifications</p>}
            renderItem={(notification) => (
              <HeaderNotificationPanelEntry key={notification.id} notification={notification} />
            )}
          />
        </div>
      </div>
    </div>
  );
};

import { FC } from "react";
import { HeaderNotificationPanelEntry } from "@/features/header/components/header-notification-panel-entry";
import Link from "next/link";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { InfiniteScrollListing } from "@/components/sections/infinite-scroll-listing/infinite-scroll-listing";
import { getUserPaginatedNotifications } from "@/utils/requests/get-user-paginated-notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateNotificationSeen } from "@/actions/update-notification-seen";

type HeaderNotificationPanelProps = {
  handlePanelClose: () => void;
};

export const HeaderNotificationPanel: FC<HeaderNotificationPanelProps> = ({ handlePanelClose }) => {
  const user = useConnectedUserStore((state) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const notificationId = e.currentTarget.dataset.notificationId;
    const tradeId = e.currentTarget.dataset.tradeId;
    const notificationSeen = e.currentTarget.dataset.notificationSeen;

    if (!notificationId || !tradeId) {
      return;
    }

    try {
      if (notificationSeen === "false") {
        await updateNotificationSeen(notificationId);

        await queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
        await queryClient.invalidateQueries({ queryKey: ["user-notifications-count"] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      handlePanelClose();
      router.push(`/trades/${tradeId}`);
    }
  };

  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-row gap-2 items-center justify-between">
          <p className="text-sm font-bold">Notifications</p>
          <Link
            href={`/profile/${user?.id}/notifications`}
            onClick={handlePanelClose}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            View all
          </Link>
        </div>
        <div className="flex-1 overflow-hidden">
          <InfiniteScrollListing
            initialData={[]}
            queryKey={["user-notifications"]}
            paginationLimit={5}
            estimateSize={64}
            overscan={4}
            getPaginatedData={({ page, limit }) => getUserPaginatedNotifications({ page, limit })}
            emptyResultComponent={
              <p className="text-sm text-muted-foreground">There&apos;s no notifications yet</p>
            }
            renderItem={(notification) => (
              <HeaderNotificationPanelEntry
                key={notification.id}
                notification={notification}
                handleClick={handleClick}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

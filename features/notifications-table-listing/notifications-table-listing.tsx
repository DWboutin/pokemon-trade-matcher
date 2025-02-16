"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { useNotificationsTableListing } from "@/features/notifications-table-listing/hooks/use-notifications-table-listing";
import { NotificationTableEntry } from "@/features/notifications-table-listing/components/notification-table-entry";
import { PopulatedNotification } from "@/utils/factories/populate-notification-with-card-data";
import { updateNotificationSeen } from "@/actions/update-notification-seen";
import { useQueryClient } from "@tanstack/react-query";

type NotificationsTableListingProps = {
  initialData: PopulatedNotification[];
  status?: "new" | "seen";
};

export const NotificationsTableListing: FC<NotificationsTableListingProps> = ({
  initialData,
  status,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    selectors: { parentRef, rowVirtualizer, items, allRows, hasNextPage },
  } = useNotificationsTableListing({ initialData, status });

  const handleRowClick = async (notification: PopulatedNotification) => {
    try {
      if (!notification.seen) {
        await updateNotificationSeen(notification.id);

        await queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
        await queryClient.invalidateQueries({ queryKey: ["user-notifications-count"] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.push(`/trades/${notification.trade}`);
    }
  };

  return (
    <div ref={parentRef} className="w-full flex flex-col">
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[900px] h-full">
          {/* Header */}
          <div className="flex flex-row gap-4 px-4 py-3 font-semibold">
            <div className="w-[50%]">Message</div>
            <div className="w-[20%]">Date</div>
            <div className="w-[30%] min-w-[300px] text-right">Actions</div>
          </div>

          {allRows.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              No notifications found
            </div>
          ) : (
            <div
              className="relative overflow-hidden"
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
              }}
            >
              {items.map((virtualRow) => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const notification = allRows[virtualRow.index];

                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className={`
                      flex px-4 py-2
                      ${
                        !isLoaderRow
                          ? "cursor-pointer hover:bg-muted/70 odd:bg-gray-100 even:rounded-md"
                          : ""
                      }
                    `}
                    onClick={() => !isLoaderRow && notification && handleRowClick(notification)}
                  >
                    {isLoaderRow ? (
                      <div className="w-full text-center h-[72px]">
                        {hasNextPage ? "Loading more..." : "Nothing more to load"}
                      </div>
                    ) : (
                      notification && <NotificationTableEntry notification={notification} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

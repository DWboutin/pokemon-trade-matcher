import { TimeAgoDate } from "@/components/time-ago-date";
import { NotificationTableDeleteButton } from "@/features/notifications-table-listing/components/notification-table-delete-button";
import { NotificationTableEntryMessage } from "@/features/notifications-table-listing/components/notification-table-entry-message";
import { NotificationTableMarkAsSeenButton } from "@/features/notifications-table-listing/components/notification-table-mark-as-seen";
import { PopulatedNotification } from "@/utils/factories/populate-notification-with-card-data";
import { FC } from "react";

type NotificationTableEntryProps = {
  notification: PopulatedNotification;
};

export const NotificationTableEntry: FC<NotificationTableEntryProps> = ({ notification }) => {
  return (
    <div className="flex flex-row flex-1 gap-4" data-notification-id={notification.id}>
      <div className="w-[50%] min-w-[300px] flex items-center gap-3">
        <NotificationTableEntryMessage notification={notification} />
      </div>
      <div className="w-[20%] min-w-[150px] flex items-center">
        <TimeAgoDate date={notification.created_at} />
      </div>
      <div className="w-[30%] min-w-[300px] flex items-center justify-end gap-2">
        {!notification.seen && (
          <NotificationTableMarkAsSeenButton notificationId={notification.id} />
        )}
        <NotificationTableDeleteButton notificationId={notification.id} />
      </div>
    </div>
  );
};

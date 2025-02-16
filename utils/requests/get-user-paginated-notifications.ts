import { currentOrigin } from "@/utils/contants";
import { Notification, NotificationWithOffer } from "@/types/app";
import populateNotificationWithCardData, {
  PopulatedNotification,
} from "@/utils/factories/populate-notification-with-card-data";

export type PaginatedNotificationStatus = "new" | "seen";

interface GetUserPaginatedNotificationsParams {
  page?: number;
  limit?: number;
  status?: PaginatedNotificationStatus;
}

export const getUserPaginatedNotifications = async ({
  page = 1,
  limit = 10,
  status,
}: GetUserPaginatedNotificationsParams): Promise<PopulatedNotification[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    status: status || "",
  });

  const response = await fetch(`${currentOrigin}/api/notifications?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 600,
      tags: ["user-notifications"],
    },
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.data.map(populateNotificationWithCardData);
};

import { currentOrigin } from "@/utils/contants";
import { Notification } from "@/types/app";
interface GetUserPaginatedNotificationsParams {
  page?: number;
  limit?: number;
}

export const getUserPaginatedNotifications = async ({
  page = 1,
  limit = 10,
}: GetUserPaginatedNotificationsParams): Promise<Notification[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${currentOrigin}/api/notifications?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: ["user-notifications"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.data;
};

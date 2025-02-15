import { currentOrigin } from "@/utils/contants";
import { notFound } from "next/navigation";

export const getUserNotificationCount = async (): Promise<number> => {
  const response = await fetch(`${currentOrigin}/api/notifications/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 600,
    },
  });

  if (response.status === 404) {
    return notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch notification count");
  }

  const data = await response.json();

  return data.count;
};

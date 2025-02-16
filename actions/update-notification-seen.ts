"use server";

import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateNotificationSeen = async (notificationId: string) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    throw new Error("No user data");
  }

  const { error: notificationError } = await supabase
    .from("notifications")
    .update({ seen: true })
    .eq("id", notificationId)
    .select();

  if (notificationError) {
    throw new Error(notificationError.message);
  }

  revalidateTag("user-notifications");
  revalidatePath(`/profile/${userData.id}/notifications`);

  return { success: "Notification seen updated" };
};

"use server";

import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteNotification = async (notificationId: string) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error } = await supabase.from("notifications").delete().eq("id", notificationId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/profile/${userData.id}/notifications`);

  return { success: "Notification deleted" };
};

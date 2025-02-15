"use server";

import { User } from "@/types/app";
import { removeFriendIdDashes } from "@/utils/friendIdFormatters";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateUserFriendInfo = async (
  friendId: string,
  username: string,
  icon: string,
  emailNotifications: boolean
): Promise<User | { error: string } | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const lowerCaseIconName = icon.toLowerCase();
  const formattedFriendId = removeFriendIdDashes(friendId);

  const { data, error } = await supabase
    .from("users")
    .update({
      friend_id: formattedFriendId,
      username,
      icon: lowerCaseIconName,
      email_opt_in: emailNotifications,
    })
    .eq("id", user.id)
    .select();

  if (error) {
    if (error.code === "23505") {
      return { error: "Friend ID already in use" };
    }

    return { error: error.message };
  }

  revalidatePath(`/profile/${user.id}/account`);

  return data ? data[0] : null;
};

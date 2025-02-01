"use server";

import { User } from "@/types/app";
import { removeFriendIdDashes } from "@/utils/friendIdFormatters";
import { createClient } from "@/utils/supabase/server";

export const updateUserFriendInfo = async (
  friendId: string,
  username: string,
  icon: string
): Promise<User | null> => {
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
    .update({ friend_id: formattedFriendId, username, icon: lowerCaseIconName })
    .eq("id", user.id)
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data ? data[0] : null;
};

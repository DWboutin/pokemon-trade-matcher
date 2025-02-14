"use server";

import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export const deleteUserProfile = async () => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error } = await supabase.from("users").delete().eq("id", userData.id);

  if (error) {
    throw new Error(error.message);
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userData.id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  revalidatePath("/");

  return { success: "User profile deleted" };
};

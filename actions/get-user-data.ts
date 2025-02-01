"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export const getUserData = async (): Promise<User | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase.from("users").select("*").eq("id", user.id);

  if (error) {
    console.error(error);
    return null;
  }

  return data ? data[0] : null;
};

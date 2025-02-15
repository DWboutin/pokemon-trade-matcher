"use server";

import { currentOrigin } from "@/utils/contants";
import { createClient } from "@/utils/supabase/server";

export const registerWithEmail = async (email: string) => {
  const supabase = await createClient();

  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: currentOrigin,
    },
  });

  return JSON.stringify(response);
};

"use server";

import { createClient } from "@/utils/supabase/server";

export const registerWithEmail = async (email: string) => {
  const supabase = await createClient();
  const currentOrigin = process.env.NEXT_PUBLIC_CURRENT_ORIGIN;

  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: currentOrigin,
    },
  });

  return JSON.stringify(response);
};

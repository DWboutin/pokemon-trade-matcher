"use server";

import { createClient } from "@/utils/supabase/server";

export const signInWithFacebook = async () => {
  const supabase = await createClient();
  const currentOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_CURRENT_ORIGIN;

  const response = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: currentOrigin,
    },
  });

  return JSON.stringify(response);
};

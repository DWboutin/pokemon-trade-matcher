"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type SignInWithOAuthArgs = {
  provider: "facebook" | "google";
};

export const signInWithOAuth = async ({ provider }: SignInWithOAuthArgs) => {
  const supabase = await createClient();
  const currentOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_CURRENT_ORIGIN;

  const response = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${currentOrigin}/auth/callback`,
    },
  });

  if (!response.error && response.data.url) {
    return redirect(response.data.url);
  }

  return JSON.stringify(response);
};

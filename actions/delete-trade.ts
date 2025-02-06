"use server";

import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteTrade = async (tradeId: string) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error } = await supabase.from("trades").delete().eq("id", tradeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/trades");
  revalidatePath(`/trades/${tradeId}`);

  return { success: "Trade deleted" };
};

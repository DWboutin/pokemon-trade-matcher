"use server";

import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteOffer = async (offerId: string, tradeId: string) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error } = await supabase.from("offers").delete().eq("id", offerId);

  if (error) {
    return { error: error.message };
  }

  revalidateTag(`trade-${tradeId}-offers`);
  revalidatePath(`/trades/${tradeId}`);
  revalidatePath(`/profile/${userData.id}/offers`);

  return { success: "Offer deleted" };
};

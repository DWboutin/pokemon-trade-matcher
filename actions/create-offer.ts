"use server";

import { getUserData } from "@/actions/get-user-data";
import { Offer } from "@/types/app";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

type CreateOfferArgs = Omit<Offer, "id" | "created_at" | "author" | "status">;

export const createOffer = async (offer: CreateOfferArgs) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { data, error } = await supabase
    .from("offers")
    .insert({
      author: userData.id,
      offered_card: offer.offered_card,
      trade_id: offer.trade_id,
    })
    .select()
    .single();

  revalidateTag(`trade-${offer.trade_id}-offers`);
  revalidatePath(`/trades/${offer.trade_id}`);

  if (error) {
    return { error: error.message };
  }

  return { data };
};

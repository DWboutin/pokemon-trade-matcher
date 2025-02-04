"use server";

import { getUserData } from "@/actions/get-user-data";
import { Offer } from "@/types/app";
import { createClient } from "@/utils/supabase/server";

type CreateOfferArgs = Omit<Offer, "id" | "created_at" | "author">;

export const createOffer = async (offer: CreateOfferArgs) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  console.log({
    author: userData.id,
    offered_card: offer.offered_card,
    trade_id: offer.trade_id,
  });

  const { data, error } = await supabase
    .from("offers")
    .insert({
      author: userData.id,
      offered_card: offer.offered_card,
      trade_id: offer.trade_id,
    })
    .select()
    .single();

  console.log({ data, error });

  if (error) {
    return { error: error.message };
  }

  return { data };
};

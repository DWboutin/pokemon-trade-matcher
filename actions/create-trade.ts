"use server";

import { getUserData } from "@/actions/get-user-data";
import { Trade } from "@/types/app";
import { createClient } from "@/utils/supabase/server";

type CreateTradeArgs = Omit<
  Trade,
  "id" | "created_at" | "author" | "accepts_offers" | "accepted_at" | "completed_at"
>;

export const createTrade = async (trade: CreateTradeArgs) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { data, error } = await supabase
    .from("trades")
    .insert({
      author: userData.id,
      main_card: trade.main_card,
      offered_cards: trade.offered_cards ?? [],
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
};

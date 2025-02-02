"use server";

import populateTradeWithCardsData from "@/utils/factories/populate-trade-with-cards-data";
import { createClient } from "@/utils/supabase/server";

export const getPaginatedTrades = async (page: number, limit: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("trades")
    .select(
      `
      *,
      author:users (
        id,
        username,
        icon
      )
    `
    )
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  const trades = data.map((trade) => populateTradeWithCardsData(trade));

  return { data: trades };
};

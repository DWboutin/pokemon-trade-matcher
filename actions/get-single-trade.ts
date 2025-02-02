import populateTradeWithCardsData from "@/utils/factories/populate-trade-with-cards-data";
import { createClient } from "@/utils/supabase/server";

export const getSingleTrade = async (id: string) => {
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
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  const trade = populateTradeWithCardsData(data);

  return { data: trade };
};

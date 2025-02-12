"use server";

import { getUserData } from "@/actions/get-user-data";
import { OfferStatus } from "@/types/app";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateOfferStatus = async ({
  tradeId,
  offerId,
  status,
}: {
  tradeId: string;
  offerId: string;
  status: Omit<OfferStatus, "pending">;
}) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error: offerError } = await supabase.from("offers").update({ status }).eq("id", offerId);

  if (offerError) {
    return { error: offerError.message };
  }

  if (status === "accepted") {
    const rejectOtherOffers = supabase
      .from("offers")
      .update({ status: "rejected" })
      .eq("trade_id", tradeId)
      .neq("id", offerId);

    const updateTrade = supabase.from("trades").update({ accepts_offers: false }).eq("id", tradeId);

    const [rejectOtherOffersError, updateTradeError] = await Promise.all([
      rejectOtherOffers,
      updateTrade,
    ]);

    if (updateTradeError.error) {
      return { error: updateTradeError.error.message };
    }
    if (rejectOtherOffersError.error) {
      return { error: rejectOtherOffersError.error.message };
    }
  }

  revalidatePath("/trades");
  revalidatePath(`/trades/${tradeId}`);

  return { success: "Offer status updated" };
};

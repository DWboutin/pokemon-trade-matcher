"use server";

import { getUserData } from "@/actions/get-user-data";
import { NotificationType, OfferStatus } from "@/types/app";
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
    throw new Error("No user data");
  }

  const { data: offer, error: offerError } = await supabase
    .from("offers")
    .update({ status })
    .eq("id", offerId)
    .select();

  console.log({ offer });

  if (offerError) {
    throw new Error(offerError.message);
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
      throw new Error(updateTradeError.error.message);
    }
    if (rejectOtherOffersError.error) {
      throw new Error(rejectOtherOffersError.error.message);
    }

    // Create notification after other operations succeed
    const { error: notificationError } = await supabase.from("notifications").insert({
      user_id: userData.id,
      type: NotificationType.OfferAccepted,
      trade_id: tradeId,
      offer_id: offerId,
    });

    if (notificationError) {
      throw new Error(notificationError.message);
    }
  }

  revalidatePath("/trades");
  revalidatePath(`/trades/${tradeId}`);

  return { success: "Offer status updated" };
};

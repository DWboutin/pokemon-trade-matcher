"use server";

import { getUserData } from "@/actions/get-user-data";
import { NotificationType, OfferStatus } from "@/types/app";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateOfferStatus = async ({
  tradeId,
  offerId,
  authorId,
  status,
}: {
  tradeId: string;
  offerId: string;
  authorId: string;
  status: Omit<OfferStatus, "pending">;
}) => {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    throw new Error("No user data");
  }

  const { error: offerError } = await supabase.from("offers").update({ status }).eq("id", offerId);

  if (offerError) {
    throw new Error(offerError.message);
  }

  if (status === "accepted") {
    const rejectOtherOffers = supabase
      .from("offers")
      .update({ status: "rejected" })
      .eq("trade_id", tradeId)
      .neq("id", offerId)
      .neq("author", authorId)
      .select("author");

    const updateTrade = supabase
      .from("trades")
      .update({ accepts_offers: false, accepted_at: new Date() })
      .eq("id", tradeId);

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

    const rejectedOffersAuthors = await supabase
      .from("offers")
      .select("author")
      .eq("trade_id", tradeId)
      .eq("status", "rejected")
      .neq("id", offerId)
      .neq("author", authorId);

    if (rejectedOffersAuthors.data) {
      const uniqueAuthors = [...new Set(rejectedOffersAuthors.data.map((offer) => offer.author))];
      const notifications = uniqueAuthors.map((authorId) => ({
        user_id: authorId,
        type: NotificationType.TradeClosed,
        trade: tradeId,
        offer: offerId,
      }));

      const { error: notificationError } = await supabase
        .from("notifications")
        .insert(notifications);

      if (notificationError) {
        throw new Error(notificationError.message);
      }
    }

    // Create notification after other operations succeed
    const { error: notificationError } = await supabase.from("notifications").insert({
      user_id: authorId,
      type: NotificationType.OfferAccepted,
      trade: tradeId,
      offer: offerId,
    });

    revalidateTag("user-notifications");
    revalidateTag("user-notifications-count");

    if (notificationError) {
      throw new Error(notificationError.message);
    }
  }

  revalidatePath("/trades");
  revalidatePath(`/trades/${tradeId}`);

  return { success: "Offer status updated" };
};

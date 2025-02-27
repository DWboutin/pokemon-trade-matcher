"use server";

import { getUserData } from "@/actions/get-user-data";
import { NotificationType } from "@/types/app";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTradeCompletedStatus(tradeId: string) {
  const supabase = await createClient();
  const userData = await getUserData();

  if (!userData) {
    throw new Error("You must be logged in to mark a trade as completed");
  }

  // Update the trade record
  const { error } = await supabase
    .from("trades")
    .update({
      completed_at: new Date(),
      marked_completed_by: userData.id,
    })
    .eq("id", tradeId);

  if (error) {
    console.error("Error updating trade:", error);
    throw new Error(error.message);
  }

  const { error: notificationError } = await supabase.from("notifications").insert({
    user_id: userData.id,
    type: NotificationType.TradeCompleted,
    trade: tradeId,
  });

  if (notificationError) {
    console.error("Error creating notification:", notificationError);
    throw new Error(notificationError.message);
  }

  // Revalidate the trade page to reflect the changes
  revalidatePath(`/trades/${tradeId}`);

  return {
    success: true,
    message: "Trade marked as completed successfully",
  };
}

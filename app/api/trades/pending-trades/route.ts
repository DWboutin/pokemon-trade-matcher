import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/actions/get-user-data";

export async function GET() {
  const user = await getUserData();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const supabase = await createClient();
  const tradesQuery = supabase
    .from("trades")
    .select(
      `
      *,
      offers (
        *,
        author:users (
          id,
          username,
          friend_id,
          icon
        )
      )
      `
    )
    .order("created_at", { ascending: false })
    .eq("accepts_offers", false)
    .is("completed_at", null)
    .eq("author", user.id)
    .eq("offers.status", "accepted");

  const offersQuery = supabase
    .from("offers")
    .select(
      `
      *,
      trade:trades (
        *,
        author:users (
          id,
          username,
          friend_id,
          icon
        )
      )
      `
    )
    .eq("author", user.id)
    .eq("status", "accepted")
    .not("trade.accepted_at", "is", null)
    .is("trade.completed_at", null);

  const [{ data: tradesData, error: tradesError }, { data: offersData, error: offersError }] =
    await Promise.all([tradesQuery, offersQuery]);

  if (tradesError || offersError) {
    const error = tradesError || offersError;
    console.error(error);
    return NextResponse.json({ error: error?.message || "An error occurred" }, { status: 400 });
  }

  return NextResponse.json({
    data: {
      trades: tradesData.map((trade) => ({
        id: trade.id,
        type: "trade",
        trader: trade.offers[0].author,
        acceptedAt: trade.accepted_at,
      })),
      offers: offersData.map((offer) => ({
        id: offer.trade.id,
        type: "offer",
        trader: offer.trade.author,
        acceptedAt: offer.trade.accepted_at,
      })),
    },
  });
}

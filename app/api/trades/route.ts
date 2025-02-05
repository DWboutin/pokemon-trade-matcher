import { NextResponse } from "next/server";
import populateTradeWithCardsData from "@/utils/factories/populate-trade-with-cards-data";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

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
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const trades = data.map((trade) => populateTradeWithCardsData(trade));

  return NextResponse.json({ data: trades });
}

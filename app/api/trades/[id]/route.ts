import { NextResponse } from "next/server";
import populateTradeWithCardsData from "@/utils/factories/populate-trade-with-cards-data";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
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
    if (error.code === "22P02") {
      return NextResponse.json({ error: "Invalid trade id" }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const trade = populateTradeWithCardsData(data);

  return NextResponse.json({ data: trade });
}

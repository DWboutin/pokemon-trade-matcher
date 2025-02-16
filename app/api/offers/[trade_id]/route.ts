import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import populateOfferWithCardData from "@/utils/factories/populate-offer-with-card-data";

export async function GET(request: Request, { params }: { params: Promise<{ trade_id: string }> }) {
  const { trade_id } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("offers")
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
    .eq("trade_id", trade_id)
    .order("status", { ascending: true })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const offers = data.map((offer) => populateOfferWithCardData(offer));

  return NextResponse.json({ data: offers });
}

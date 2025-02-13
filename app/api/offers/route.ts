import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import populateOfferWithCardData from "@/utils/factories/populate-offer-with-card-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const authorId = searchParams.get("authorId") || "";
  const status = searchParams.get("status") || "";
  const supabase = await createClient();
  const query = supabase
    .from("offers")
    .select("*")
    .eq("author", authorId)
    .eq("status", status)
    .order("created_at", { ascending: false });

  const { data, error } = await query.range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const offers = data.map((offer) => populateOfferWithCardData(offer));

  return NextResponse.json({
    data: offers,
  });
}

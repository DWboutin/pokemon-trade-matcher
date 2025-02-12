import { NextResponse } from "next/server";
import populateTradeWithCardsData from "@/utils/factories/populate-trade-with-cards-data";
import { createClient } from "@/utils/supabase/server";
import { searchCardsData } from "@/actions/search-cards-data";
import { CardData } from "@/types/app";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const filters = JSON.parse(searchParams.get("filters") || "{}");
  const authorId = searchParams.get("authorId") || "";
  const status = searchParams.get("status") || "all";
  const containsValidFilters = Object.values(filters).filter(Boolean).length > 0;

  const filteredCards = containsValidFilters ? await searchCardsData(filters) : "[]";
  const parsedFilteredCards = JSON.parse(filteredCards);
  const cardsToSearchOn = parsedFilteredCards
    .map((card: CardData) => `"${card.cardNumber}"`)
    .join(",");

  const supabase = await createClient();
  let query = supabase
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
    .order("created_at", { ascending: false });

  if (authorId) {
    query = query.eq("author", authorId);
  }

  if (status === "pending") {
    query = query.eq("accepts_offers", true);
  } else if (status === "ended") {
    query = query.eq("accepts_offers", false);
  }

  if (cardsToSearchOn) {
    query = query.or(`main_card.in.(${cardsToSearchOn}),offered_cards.ov.{${cardsToSearchOn}}`);
  }

  const { data, error } = await query.range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const trades = data.map((trade) => populateTradeWithCardsData(trade));

  return NextResponse.json({ data: trades });
}

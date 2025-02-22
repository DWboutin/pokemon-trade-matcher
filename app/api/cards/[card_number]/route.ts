import { NextResponse } from "next/server";

import { CardsData } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";
import { populateCardWithRelatedCards } from "@/utils/factories/populate-card-with-related-cards";

const cardsData = cardsDataJson as CardsData;
const cardsByNumber = cardsData.cards.reduce((acc, card) => {
  acc[card.cardNumber] = card;
  return acc;
}, {} as Record<string, CardsData["cards"][0]>);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ card_number: string }> }
) {
  const { card_number } = await params;
  const card = cardsByNumber[card_number];

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const populatedCard = await populateCardWithRelatedCards(card);

  return NextResponse.json({ data: populatedCard });
}

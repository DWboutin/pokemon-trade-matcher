import { NextResponse } from "next/server";

import { CardsData } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";

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
  const cardNumber = card_number.replace("-", " ");

  const card = cardsByNumber[cardNumber];

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json({ data: card });
}

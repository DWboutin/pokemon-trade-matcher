import { NextResponse } from "next/server";
import { CardsData } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";

const cardsData = cardsDataJson as CardsData;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = searchParams;
    const cardName = params.get("cardName");
    const rarity = params.get("rarity");
    const exclusivePackName = params.get("exclusivePackName");
    const exclusivePackSeries = params.get("exclusivePackSeries");
    const type = params.get("type");
    const hp = params.get("hp");
    const stage = params.get("stage");
    const skill = params.get("skill");

    const filteredCards = cardsData.cards.filter((card) => {
      if (cardName && !card.cardName.toLowerCase().includes(cardName.toLowerCase())) {
        return false;
      }

      if (rarity && card.rarity !== rarity) {
        return false;
      }

      if (exclusivePackName && card.exclusivePack.name !== exclusivePackName) {
        return false;
      }

      if (exclusivePackSeries && card.exclusivePack.series !== exclusivePackSeries) {
        return false;
      }

      if (type && card.type !== type) {
        return false;
      }

      if (hp && card.hp < parseInt(hp)) {
        return false;
      }

      if (stage && card.stage !== stage) {
        return false;
      }

      if (skill && !card.effects.some((effect) => effect.name === skill)) {
        return false;
      }

      return true;
    });

    return NextResponse.json({ data: filteredCards });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

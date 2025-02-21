import { CardData } from "@/types/app";

const specialCases: Record<string, string> = {
  "mr-mime": "Mr. Mime",
  "mime-jr": "Mime Jr.",
  "type-null": "Type: Null",
  farfetchd: "Farfetch'd",
  sirfetchd: "Sirfetch'd",
};

export const slugifyCard = (card: CardData) => {
  const name = card.cardName.toLowerCase().replace(/[ .:]/g, "-").replace(/'/g, "");

  return `${name}-${card.cardNumber.replace(/\s/g, "-")}`;
};

export const unslugifyCard = (slug: string) => {
  // Find the last occurrence of cardNumber pattern (e.g. A1-001) and split there
  const match = slug.match(/(.*)-([A-Z]\d-\d+)$/);
  if (!match) {
    throw new Error(`Invalid slug format: ${slug}`);
  }

  const [, slugCardName, cardNumber] = match;
  const cardName = specialCases[slugCardName]
    ? specialCases[slugCardName]
    : slugCardName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    cardName,
    cardNumber,
  };
};

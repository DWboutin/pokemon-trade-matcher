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

  const cardNumber = card.cardNumber.replace(/\s/g, "-");

  return `${name}-${cardNumber}`;
};

export const unslugifyCard = (slug: string) => {
  // Updated pattern to handle "-ex" in card names
  const match = slug.match(/(.*?)-([A-Z]\d[a-z]?-\d+|[A-Z]-[A-Z]-\d+)$/);
  if (!match) {
    throw new Error(`Invalid slug format: ${slug}`);
  }

  const [, slugCardName, cardNumber] = match;
  const cardName = specialCases[slugCardName]
    ? specialCases[slugCardName]
    : slugCardName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Convert the last hyphen before the number to a space
  const formattedCardNumber = cardNumber.replace(/-([\d]+)$/, " $1");

  return {
    cardName,
    cardNumber: formattedCardNumber,
  };
};

import { CardData } from "@/types/app";
import { currentOrigin } from "@/utils/contants";
import { notFound } from "next/navigation";

export const getCardByCardNumber = async (cardNumber: string): Promise<CardData | null> => {
  const response = await fetch(`${currentOrigin}/api/cards/${cardNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 604800,
      tags: [`card-${cardNumber}`],
    },
  });

  if (response.status === 404) {
    return notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to get card by card number");
  }

  const data = await response.json();

  return data.data;
};

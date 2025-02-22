import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { CardData } from "@/types/app";
import { currentOrigin } from "@/utils/contants";
import { notFound } from "next/navigation";
import { z } from "zod";

export const getSearchCards = async (
  values: z.infer<typeof cardsSearchSchema>
): Promise<CardData[] | null> => {
  const queryParams = new URLSearchParams(values as Record<string, string>);
  const queryString = queryParams.toString();
  const response = await fetch(`${currentOrigin}/api/cards/?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 604800,
      tags: ["cards"],
    },
  });

  if (response.status === 404) {
    return notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to search cards");
  }

  const data = await response.json();

  return data.data;
};

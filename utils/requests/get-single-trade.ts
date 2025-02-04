import { currentOrigin } from "@/utils/contants";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { notFound } from "next/navigation";

export const getSingleTrade = async (id: string): Promise<PopulatedTrade | null> => {
  const response = await fetch(`${currentOrigin}/api/trades/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 300,
      tags: [`trade-${id}`],
    },
  });

  if (response.status === 404) {
    return notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch trade");
  }

  const data = await response.json();

  return data.data;
};

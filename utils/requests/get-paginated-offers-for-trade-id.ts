import { currentOrigin } from "@/utils/contants";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";

interface GetPaginatedOffersForTradeIdParams {
  page?: number;
  limit?: number;
  tradeId: string;
}

export const getPaginatedOffersForTradeId = async ({
  page = 1,
  limit = 10,
  tradeId,
}: GetPaginatedOffersForTradeIdParams): Promise<PopulatedOffer[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${currentOrigin}/api/offers/${tradeId}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: [`trade-${tradeId}-offers`],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  const data = await response.json();

  return data.data;
};

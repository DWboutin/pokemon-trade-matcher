import { currentOrigin } from "@/utils/contants";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";

interface GetPaginatedTradesParams {
  page?: number;
  limit?: number;
}

export const getPaginatedTrades = async ({
  page = 1,
  limit = 10,
}: GetPaginatedTradesParams = {}): Promise<PopulatedTrade[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${currentOrigin}/api/trades?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trades");
  }

  const data = await response.json();

  return data.data;
};

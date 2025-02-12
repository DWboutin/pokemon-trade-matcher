import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { currentOrigin } from "@/utils/contants";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { z } from "zod";

interface GetPaginatedTradesParams {
  page?: number;
  limit?: number;
  filters?: z.infer<typeof cardsSearchSchema>;
  authorId?: string;
  status?: "all" | "pending" | "ended";
}

export const getPaginatedTrades = async ({
  page = 1,
  limit = 10,
  filters = {},
  authorId,
  status = "all",
}: GetPaginatedTradesParams = {}): Promise<PopulatedTrade[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    filters: JSON.stringify(filters),
    authorId: authorId || "",
    status,
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

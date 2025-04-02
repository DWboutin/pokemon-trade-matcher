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

interface TradesResponse {
  data: PopulatedTrade[];
  error?: {
    message: string;
    details?: string;
    code?: string;
  };
}

export const getPaginatedTrades = async ({
  page = 1,
  limit = 10,
  filters = {},
  authorId,
  status = "all",
}: GetPaginatedTradesParams = {}): Promise<PopulatedTrade[]> => {
  try {
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

    const responseData: TradesResponse = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.error
        ? `${responseData.error.message}${
            responseData.error.details ? `: ${responseData.error.details}` : ""
          }`
        : `Failed to fetch trades: ${response.status} ${response.statusText}`;

      throw new Error(errorMessage);
    }

    return responseData.data || [];
  } catch (error) {
    console.error("Error fetching trades:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch trades");
  }
};

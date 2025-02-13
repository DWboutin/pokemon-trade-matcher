import { currentOrigin } from "@/utils/contants";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";

interface GetPaginatedOffersForUserIdParams {
  page?: number;
  limit?: number;
  authorId?: string;
  status?: "pending" | "accepted" | "rejected";
}

export const getPaginatedOffersForUserId = async ({
  page = 1,
  limit = 10,
  authorId,
  status = "pending",
}: GetPaginatedOffersForUserIdParams = {}): Promise<PopulatedOffer[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    authorId: authorId || "",
    status: status,
  });

  const response = await fetch(`${currentOrigin}/api/offers?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  const data = await response.json();

  return data.data;
};

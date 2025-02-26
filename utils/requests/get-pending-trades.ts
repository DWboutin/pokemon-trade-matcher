import { PendingTradeWithType } from "@/types/app";

export type PendingTradesResponse = {
  trades: PendingTradeWithType[];
  offers: PendingTradeWithType[];
};

export const getPendingTrades = async (): Promise<PendingTradesResponse> => {
  const response = await fetch("/api/trades/pending-trades");

  if (!response.ok) {
    throw new Error("Failed to fetch pending trades");
  }

  const data = await response.json();

  return data.data;
};

"use client";

import { Button } from "@/components/ui/button";
import { TradeCard } from "@/features/trade-card/trade-card";
import { useTradeListing } from "@/features/trades-listing/hooks/use-trade-listing";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import Link from "next/link";
import { FC } from "react";

type TradesInfiniteListingProps = {
  initialData: PopulatedTrade[];
  authorId?: string;
  status?: "all" | "pending" | "ended";
};

export const TradesInfiniteListing: FC<TradesInfiniteListingProps> = ({
  initialData,
  authorId,
  status,
}) => {
  const {
    selectors: { parentRef, rowVirtualizer, items, allRows, hasNextPage },
    actions: {},
  } = useTradeListing({ initialData, authorId, status });

  return (
    <div ref={parentRef} className="w-full h-full">
      {allRows.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center flex-col gap-4">
          <p className="text-gray-500 text-lg">No trades found</p>
          <Link href="/trades/create">
            <Button variant="destructive">Create a trade</Button>
          </Link>
        </div>
      ) : (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {items.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const trade = allRows[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="pb-4"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow
                  ? hasNextPage
                    ? "Loading more..."
                    : "Nothing more to load"
                  : trade && (
                      <Link href={`/trades/${trade.id}`}>
                        <TradeCard
                          mainCard={trade.mainCard}
                          offeredCards={trade.offeredCards}
                          username={trade.author.username}
                          icon={trade.author.icon}
                          friendId={trade.author.id}
                          time={trade.created_at}
                          acceptsOffers={trade.accepts_offers}
                        />
                      </Link>
                    )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

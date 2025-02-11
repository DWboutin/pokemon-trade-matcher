"use client";

import { TradeCard } from "@/features/trade-card/trade-card";
import { useTradeListing } from "@/features/trades-listing/hooks/use-trade-listing";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import Link from "next/link";
import { FC } from "react";

type TradesInfiniteListingProps = {
  initialData: PopulatedTrade[];
};

export const TradesInfiniteListing: FC<TradesInfiniteListingProps> = ({ initialData }) => {
  const {
    selectors: { parentRef, rowVirtualizer, items, allRows, hasNextPage },
    actions: {},
  } = useTradeListing({ initialData });

  return (
    <div ref={parentRef} className="w-full h-full max-md:px-4">
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
                      />
                    </Link>
                  )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

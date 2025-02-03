"use client";

import { TradeCard } from "@/features/trade-card/trade-card";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { getPaginatedTrades } from "@/utils/requests/get-paginated-trades";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";

type TradesListingProps = {
  initialData: PopulatedTrade[];
};

const PAGINATION_LIMIT = 10;

export const TradesListing: FC<TradesListingProps> = ({ initialData }) => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["trades"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getPaginatedTrades({
          page: pageParam,
          limit: PAGINATION_LIMIT,
        });

        return response;
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.length === PAGINATION_LIMIT ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  const allRows = data ? data.pages.flatMap((d) => d) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => 280,
    overscan: 3,
    measureElement: (element) => {
      return (element as HTMLElement).offsetHeight;
    },
  });

  const items = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...items].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, items]);

  return (
    <div ref={parentRef} className="w-full h-full">
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

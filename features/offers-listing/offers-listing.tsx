"use client";

import { Typography } from "@/components/typography";
import OfferCard from "@/features/offers-listing/components/offer-card";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { getPaginatedOffersForTradeId } from "@/utils/requests/get-paginated-offers-for-trade-id";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { FC, useEffect, useRef } from "react";

type OffersListingProps = {
  tradeId: string;
  initialData: PopulatedOffer[];
};

const PAGINATION_LIMIT = 10;

export const OffersListing: FC<OffersListingProps> = ({ tradeId, initialData }) => {
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["offers", tradeId],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getPaginatedOffersForTradeId({
          page: pageParam,
          limit: PAGINATION_LIMIT,
          tradeId,
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
    overscan: 5,
    scrollMargin: 0,
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
          const offer = allRows[virtualRow.index];

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
                : offer && <OfferCard offer={offer} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

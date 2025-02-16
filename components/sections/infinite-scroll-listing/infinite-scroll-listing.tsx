"use client";

import { useInfiniteScrollListing } from "@/components/sections/infinite-scroll-listing/hooks/use-infinite-scroll-listing";

type InfiniteScrollListingProps<TData> = {
  initialData: TData[];
  queryKey: string[];
  overscan: number;
  estimateSize: number;
  paginationLimit: number;
  getPaginatedData: (args: { page: number; limit: number }) => Promise<TData[]>;
  emptyResultComponent: React.ReactNode;
  renderItem: (item: TData) => React.ReactNode;
};

export const InfiniteScrollListing = <TData,>({
  initialData,
  queryKey,
  overscan,
  estimateSize,
  paginationLimit,
  getPaginatedData,
  emptyResultComponent,
  renderItem,
}: InfiniteScrollListingProps<TData>) => {
  const {
    selectors: { rowVirtualizer, items, allRows, hasNextPage, parentRef },
  } = useInfiniteScrollListing({
    initialData,
    queryKey,
    paginationLimit,
    overscan,
    estimateSize,
    getPaginatedData,
  });

  if (allRows.length === 0) {
    return emptyResultComponent;
  }

  return (
    <div
      className="w-full h-full overflow-y-auto"
      ref={parentRef as React.RefObject<HTMLDivElement>}
    >
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
              className="[&:not(:last-child)]:pb-4"
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
                : renderItem(offer)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

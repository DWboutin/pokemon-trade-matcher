import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import { RefObject, useEffect, useRef } from "react";

type UseInfiniteScrollListingProps<TData> = {
  initialData: TData[];
  queryKey: string[];
  overscan: number;
  estimateSize: number;
  paginationLimit: number;
  getPaginatedData: (args: { page: number; limit: number }) => Promise<TData[]>;
};

type UseInfiniteScrollListingSelectors<TData> = {
  rowVirtualizer: ReturnType<typeof useVirtualizer<Element, Element>>;
  items: VirtualItem[];
  allRows: TData[];
  hasNextPage: boolean;
  error: Error | null;
  parentRef: RefObject<Element | null>;
};

type UseInfiniteScrollListingHook<TData> = {
  selectors: UseInfiniteScrollListingSelectors<TData>;
};

export const useInfiniteScrollListing = <TData,>({
  initialData,
  queryKey,
  overscan,
  estimateSize,
  getPaginatedData,
  paginationLimit,
}: UseInfiniteScrollListingProps<TData>): UseInfiniteScrollListingHook<TData> => {
  const parentRef = useRef<Element>(null);
  const { data, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPaginatedData({
        page: pageParam,
        limit: paginationLimit,
      });

      return response;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length === paginationLimit ? pages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });

  const allRows = data ? data.pages.flatMap((d) => d) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    estimateSize: () => estimateSize,
    overscan: overscan,
    scrollMargin: 0,
    getScrollElement: () => parentRef?.current,
    measureElement: (element) => {
      return (element as HTMLElement).offsetHeight;
    },
  });

  const items = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = items[items.length - 1];

    if (!lastItem) {
      return;
    }

    // Load more when we get closer to the end
    const isCloseToBottom = lastItem.index >= allRows.length - 1 - 5; // Start loading 5 items before the end

    if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page..."); // Add this to debug
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, allRows.length, isFetchingNextPage, items]);

  return {
    selectors: {
      rowVirtualizer,
      items,
      allRows,
      error,
      hasNextPage,
      parentRef,
    },
  };
};

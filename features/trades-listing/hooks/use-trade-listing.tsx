import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { getPaginatedTrades } from "@/utils/requests/get-paginated-trades";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { VirtualItem } from "@tanstack/react-virtual";
import { useTradesListingStore } from "@/stores/trades-listing-store";
import { TRADES_LISTING_PAGINATION_LIMIT } from "@/utils/contants";

type UseTradeListingSelectors = {
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: ReturnType<typeof useWindowVirtualizer>;
  items: VirtualItem[];
  allRows: PopulatedTrade[];
  hasNextPage: boolean;
};

type UseTradeListingActions = {};

type UseTradeListingHook = {
  selectors: UseTradeListingSelectors;
  actions: UseTradeListingActions;
};

type UseTradeListingArgs = {
  initialData: PopulatedTrade[];
  authorId?: string;
  status?: "all" | "pending" | "ended";
};

export const useTradeListing = ({
  initialData,
  authorId,
  status,
}: UseTradeListingArgs): UseTradeListingHook => {
  const filters = useTradesListingStore((state) => state.filters);
  const { data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["trades", { ...filters, authorId, status }],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getPaginatedTrades({
          page: pageParam,
          limit: TRADES_LISTING_PAGINATION_LIMIT,
          filters,
          authorId,
          status,
        });

        return response;
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.length === TRADES_LISTING_PAGINATION_LIMIT ? pages.length + 1 : undefined;
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

  return {
    selectors: {
      parentRef,
      rowVirtualizer,
      items,
      allRows,
      hasNextPage,
    },
    actions: {},
  };
};

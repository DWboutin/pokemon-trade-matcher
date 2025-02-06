import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { getPaginatedOffersForTradeId } from "@/utils/requests/get-paginated-offers-for-trade-id";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import { RefObject, useEffect, useRef } from "react";

const PAGINATION_LIMIT = 10;

type UseOffersListingProps = {
  initialData: PopulatedOffer[];
  tradeId: string;
};

type UseOffersListingSelectors = {
  parentRef: RefObject<HTMLDivElement | null>;
  rowVirtualizer: ReturnType<typeof useWindowVirtualizer>;
  items: VirtualItem[];
  allRows: PopulatedOffer[];
  hasNextPage: boolean;
  error: Error | null;
};

type UseOffersListingHook = {
  selectors: UseOffersListingSelectors;
};

export const useOffersListing = ({
  initialData,
  tradeId,
}: UseOffersListingProps): UseOffersListingHook => {
  const { data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
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
      refetchOnWindowFocus: false,
      staleTime: 0,
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

  return {
    selectors: {
      parentRef,
      rowVirtualizer,
      items,
      allRows,
      error,
      hasNextPage,
    },
  };
};

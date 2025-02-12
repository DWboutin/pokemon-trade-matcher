import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { VirtualItem } from "@tanstack/react-virtual";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { getPaginatedOffersForUserId } from "@/utils/requests/get-paginated-offers-for-user-id";

const PAGINATION_LIMIT = 30;

type UseOffersTableListingSelectors = {
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: ReturnType<typeof useWindowVirtualizer>;
  items: VirtualItem[];
  allRows: PopulatedOffer[];
  hasNextPage: boolean;
};

type UseOffersTableListingActions = {};

type UseOffersTableListingHook = {
  selectors: UseOffersTableListingSelectors;
  actions: UseOffersTableListingActions;
};

type UseOffersTableListingArgs = {
  initialData: PopulatedOffer[];
  authorId?: string;
};

export const useOffersTableListing = ({
  initialData,
  authorId,
}: UseOffersTableListingArgs): UseOffersTableListingHook => {
  const { data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["offers", { authorId }],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getPaginatedOffersForUserId({
          page: pageParam,
          limit: PAGINATION_LIMIT,
          authorId,
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
    overscan: 10,
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

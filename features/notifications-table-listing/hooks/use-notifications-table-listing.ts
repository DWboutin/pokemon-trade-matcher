import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { VirtualItem } from "@tanstack/react-virtual";
import {
  NOTIFICATIONS_TABLE_LISTING_PAGINATION_LIMIT,
  OFFERS_TABLE_LISTING_PAGINATION_LIMIT,
} from "@/utils/contants";
import {
  getUserPaginatedNotifications,
  PaginatedNotificationStatus,
} from "@/utils/requests/get-user-paginated-notifications";
import { PopulatedNotification } from "@/utils/factories/populate-notification-with-card-data";

type UseNotificationsTableListingSelectors = {
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: ReturnType<typeof useWindowVirtualizer>;
  items: VirtualItem[];
  allRows: PopulatedNotification[];
  hasNextPage: boolean;
};

type UseNotificationsTableListingHook = {
  selectors: UseNotificationsTableListingSelectors;
};

type UseNotificationsTableListingArgs = {
  initialData: PopulatedNotification[];
  authorId?: string;
  status?: PaginatedNotificationStatus;
};

export const useNotificationsTableListing = ({
  initialData,
  status,
}: UseNotificationsTableListingArgs): UseNotificationsTableListingHook => {
  const { data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["user-notifications", { status }],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getUserPaginatedNotifications({
          page: pageParam,
          limit: NOTIFICATIONS_TABLE_LISTING_PAGINATION_LIMIT,
          status,
        });

        return response;
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.length === OFFERS_TABLE_LISTING_PAGINATION_LIMIT
          ? pages.length + 1
          : undefined;
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
  };
};

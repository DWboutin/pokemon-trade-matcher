import { useConnectedUserStore } from "@/stores/connected-user-store";
import { getPendingTrades } from "@/utils/requests/get-pending-trades";
import { useQuery } from "@tanstack/react-query";

export const usePendingTrades = () => {
  const user = useConnectedUserStore((state) => state.user);
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["user-pending-trades"],
    queryFn: async () => {
      const response = await getPendingTrades();

      return response;
    },
    enabled: !!user,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    selectors: { data, isLoading, isFetching, error },
    actions: { refetch },
  };
};

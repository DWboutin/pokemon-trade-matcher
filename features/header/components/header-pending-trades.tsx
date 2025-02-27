"use client";

import { FC, useMemo, useState } from "react";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LuTriangleAlert } from "react-icons/lu";
import { usePendingTrades } from "@/utils/hooks/use-pending-trades";
import { HeaderPendingTradesPanel } from "@/features/header/components/header-pending-trades-panel";

export const HeaderPendingTrades: FC = () => {
  const user = useConnectedUserStore((state) => state.user);
  const isLoading = useConnectedUserStore((state) => state.isLoading);
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectors: { data, isLoading: pendingTradesLoading, isFetching },
  } = usePendingTrades();

  const count = useMemo(() => {
    if (!data) {
      return 0;
    }

    const tradesCount = data?.trades.length || 0;
    const offersCount = data?.offers.length || 0;

    return tradesCount + offersCount;
  }, [data]);

  if ((!user && !isLoading) || count === 0 || isLoading || pendingTradesLoading || isFetching) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
          <LuTriangleAlert className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 overflow-hidden" align="end">
        <HeaderPendingTradesPanel handlePanelClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

import { FC, useMemo } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { usePendingTrades } from "@/utils/hooks/use-pending-trades";
import { HeaderPendingTradesPanelEntry } from "@/features/header/components/header-pending-trades-panel-entry";

type HeaderPendingTradesPanelProps = {
  handlePanelClose: () => void;
};

export const HeaderPendingTradesPanel: FC<HeaderPendingTradesPanelProps> = ({
  handlePanelClose,
}) => {
  const {
    selectors: { data },
  } = usePendingTrades();
  const pendingItems = useMemo(() => {
    if (!data) return [];

    const mergedItems = [...(data.trades || []), ...(data.offers || [])];

    return mergedItems.sort((a, b) => {
      if (!a.acceptedAt) return 1;
      if (!b.acceptedAt) return -1;
      return new Date(b.acceptedAt).getTime() - new Date(a.acceptedAt).getTime();
    });
  }, [data]);

  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-row gap-2 items-center">
          <LuTriangleAlert className="h-4 w-4" />
          <p className="text-sm font-bold">Theses trades needs your attention</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {pendingItems.map((item) => (
              <HeaderPendingTradesPanelEntry key={item.id} entry={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

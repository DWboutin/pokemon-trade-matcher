import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { SkeletonSearchSection } from "@/components/skeletons/skeleton-seach-section";
import { SkeletonTradeCard } from "@/components/skeletons/skeleton-trade-card";

const TradesLoading = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Skeleton className="h-10 w-32" /> {/* For the "Trades" heading */}
        <div className="flex flex-1 w-full flex-col gap-4">
          <div className="flex flex-col gap-10 max-md:px-4">
            {/* Search section skeleton - matching CardsSearch component */}
            <SkeletonSearchSection />

            {/* Trade listings skeleton - matching TradeCard layout */}
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, index) => (
                <SkeletonTradeCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesLoading;

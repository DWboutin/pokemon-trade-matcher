import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTradeCard = () => {
  return (
    <Card className="shadow-lg relative overflow-hidden border-2 border-gray-50 border-t-white border-l-white rounded-tl-3xl rounded-br-3xl">
      <div className="flex flex-row max-sm:flex-col max-sm:items-center p-6">
        {/* Main card image skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="w-[135px] h-[190px] rounded-md" />
        </div>

        <div className="flex flex-col flex-1 w-full gap-4 ml-6 max-sm:ml-0 max-sm:mt-4">
          {/* Title and description */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Offered cards row */}
          <div className="flex flex-row gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-[60px] h-[87px] rounded-md" />
            ))}
          </div>

          {/* Footer with timestamp and user info */}
          <div className="flex justify-end items-center gap-2 mt-auto">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </Card>
  );
};

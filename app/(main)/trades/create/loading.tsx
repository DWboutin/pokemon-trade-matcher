import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SkeletonTradeCard } from "@/components/skeletons/skeleton-trade-card";

const CreateTradeLoading = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        {/* Title skeleton */}
        <Skeleton className="h-10 w-48" />

        <div className="w-full">
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-8 w-24" /> {/* Card title */}
              <Skeleton className="h-4 w-full" /> {/* Card description */}
              <Skeleton className="h-4 w-4/5" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search input skeleton */}
              <Skeleton className="h-10 w-full" />

              {/* Cards grid skeleton */}
              <div className="flex flex-col gap-4 items-center">
                <Skeleton className="h-10 w-[400px]" />
              </div>

              {/* Trade preview skeleton */}
              <SkeletonTradeCard />
            </CardContent>
            <CardFooter className="flex flex-row justify-end gap-2">
              <Skeleton className="h-10 w-24" /> {/* Reset button */}
              <Skeleton className="h-10 w-32" /> {/* Create trade button */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateTradeLoading;

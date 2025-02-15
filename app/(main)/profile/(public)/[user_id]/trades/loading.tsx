import { SkeletonSearchSection } from "@/components/skeletons/skeleton-seach-section";
import { SkeletonTradeCard } from "@/components/skeletons/skeleton-trade-card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileTradesPageLoading = () => {
  return (
    <div className="flex flex-col gap-4 max-md:px-4">
      <div className="flex flex-col gap-4">
        {/* Title skeleton */}
        <Skeleton className="h-8 w-32" />

        {/* Search bar skeleton */}
        <SkeletonSearchSection />
      </div>

      {/* Tabs skeleton */}
      <div className="w-full">
        <Skeleton className="h-12 w-full mb-8" />

        {/* Trade cards skeleton */}
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonTradeCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTradesPageLoading;

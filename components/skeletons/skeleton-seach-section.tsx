import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonSearchSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Skeleton className="h-4 w-24" /> {/* Search input label */}
      </div>
      <div className="flex flex-row gap-4 w-full">
        <Skeleton className="h-10 flex-1" /> {/* Search input */}
        <Skeleton className="h-10 w-24" /> {/* Search filters button */}
      </div>
      <div className="flex flex-row gap-4 w-full">
        <Skeleton className="h-10 w-full flex-1" /> {/* Search input */}
      </div>
    </div>
  );
};

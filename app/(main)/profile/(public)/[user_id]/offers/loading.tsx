import { Skeleton } from "@/components/ui/skeleton";

const ProfileOffersPageLoading = () => {
  return (
    <div className="flex flex-col gap-4 max-md:px-4">
      <div className="flex flex-col gap-4">
        {/* Title skeleton */}
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Tabs skeleton */}
      <div className="w-full">
        <Skeleton className="h-12 w-full mb-8" />

        {/* Table skeleton */}
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="flex px-4 py-3">
            <div className="w-[40%]">
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="w-[40%]">
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="w-[20%]">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>

          {/* Table rows */}
          <div className="flex flex-col">
            {[...Array(5)].map((_, index) => (
              <div key={index} className={`flex px-4 py-2 ${index % 2 === 0 ? "bg-gray-100" : ""}`}>
                <div className="w-[40%]">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-[51px] h-[72px]" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
                <div className="w-[40%]">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-[51px] h-[72px]" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
                <div className="w-[20%] flex items-center">
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOffersPageLoading;

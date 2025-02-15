import { Skeleton } from "@/components/ui/skeleton";

const TradePageLoading = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-1 flex-col gap-4 py-10 items-center max-md:px-4">
        {/* Heading */}
        <div className="w-full flex flex-1 flex-col gap-4">
          <div className="w-full flex flex-col gap-4 py-4 items-center text-center">
            <Skeleton className="h-10 w-[300px]" />
          </div>
        </div>

        {/* Author info */}
        <div className="flex w-full max-w-[640px] flex-1 justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-[100px]" />
          </div>
          <Skeleton className="h-5 w-[80px]" />
        </div>

        <div className="flex flex-col w-full max-w-[640px] items-center gap-8">
          {/* Card info heading */}
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Main card image */}
          <Skeleton className="h-[320px] w-[240px] rounded-md" />

          {/* Tabs section */}
          <div className="w-full">
            <Skeleton className="h-10 w-full mb-6 rounded-lg" />
            {/* Offers listing skeleton */}
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="relative flex flex-col gap-4 p-4 overflow-hidden border-2 border-gray-50 border-t-white border-l-white shadow-lg rounded-xl rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100"
                >
                  <div className="flex flex-row gap-4 max-md:flex-col max-md:items-center z-10">
                    {/* Card image skeleton */}
                    <div className="flex-shrink-0">
                      <Skeleton className="h-[100px] w-[80px]" />
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      {/* Rarity and status */}
                      <div className="flex flex-row justify-between gap-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-20" />
                      </div>

                      {/* Card name and pack */}
                      <div className="flex flex-1 w-full flex-row gap-2">
                        <Skeleton className="h-6 w-6 flex-shrink-0" />
                        <Skeleton className="h-6 flex-1 w-full" />
                      </div>

                      {/* User info */}
                      <div className="flex justify-end flex-shrink-0 ml-auto">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePageLoading;

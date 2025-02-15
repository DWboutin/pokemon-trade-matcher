import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FriendInfoLoading() {
  return (
    <div className="flex flex-col gap-4 py-10 items-center">
      {/* Title and subtitle skeletons */}
      <Skeleton className="h-10 w-[400px]" />
      <Skeleton className="h-4 w-96 max-w-[80%]" />

      {/* Form card skeleton */}
      <div className="max-md:px-4 w-full max-w-[600px]">
        <div className="flex flex-col gap-6 mt-4">
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="h-6 w-48 mx-auto" />
              <Skeleton className="h-4 w-72 mx-auto mt-2" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* Friend ID field */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Username field */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Player icon field */}
                <div className="flex flex-row justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-40" />
                  </div>
                  <Skeleton className="h-20 w-20 rounded-full" />
                </div>

                {/* Email notifications checkbox */}
                <Skeleton className="h-20 w-full" />

                {/* Submit button */}
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Delete profile button skeleton */}
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

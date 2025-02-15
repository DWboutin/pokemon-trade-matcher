"use client";

import { Bell } from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { ButtonLoading } from "@/components/ui/button-loading";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HeaderNotificationPanel } from "@/features/header/components/header-notification-panel";

const HeaderNotifications: FC = () => {
  const isLoading = useConnectedUserStore((state) => state.isLoading);
  const user = useConnectedUserStore((state) => state.user);
  const { data: notificationCount } = useQuery({
    queryKey: ["notificationCount"],
    queryFn: async () => {
      const response = await fetch("/api/notifications/count");
      if (!response.ok) {
        throw new Error("Failed to fetch notification count");
      }
      const data = await response.json();
      return data.count;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
        <ButtonLoading />
      </Button>
    );
  }

  if (!user && !isLoading) {
    return null;
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 overflow-hidden" align="end">
        <HeaderNotificationPanel />
      </PopoverContent>
    </Popover>
  );
};

export default HeaderNotifications;

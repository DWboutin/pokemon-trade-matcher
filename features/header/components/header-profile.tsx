"use client";

import { HoverableTooltip } from "@/components/hoverable-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import Link from "next/link";
import { FC, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";

const HeaderProfile: FC = () => {
  const isLoading = useConnectedUserStore((state) => state.isLoading);
  const user = useConnectedUserStore((state) => state.user);
  const handleSignOut = useConnectedUserStore((state) => state.handleSignOut);
  const fetchUserData = useConnectedUserStore((state) => state.fetchUserData);
  const displayedName = user?.username ?? user?.email;

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return (
      <Button variant={isLoading ? "outline" : "default"} disabled={isLoading}>
        {isLoading && (
          <>
            <AiOutlineLoading3Quarters className="animate-spin" />
            <span>Loading profile...</span>
          </>
        )}
        {!isLoading && <Link href="/auth">Login</Link>}
      </Button>
    );
  }

  return (
    <div className="flex flex-1 flex-row gap-2 items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage src={`/icons/${user.icon}.png`} />
          <AvatarFallback>{displayedName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>{displayedName}</span>
      </div>
      <Button
        onClick={handleSignOut}
        variant="secondary"
        size="icon"
        className="bg-yellow-300 hover:bg-yellow-500"
      >
        <HiOutlineLogout />
      </Button>
    </div>
  );
};

export default HeaderProfile;

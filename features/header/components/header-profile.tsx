"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import Link from "next/link";
import { FC, useEffect } from "react";
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
        {isLoading && <ButtonLoading>Loading profile...</ButtonLoading>}
        {!isLoading && <Link href="/auth">Login</Link>}
      </Button>
    );
  }

  return (
    <div className="flex flex-1 flex-row gap-4 items-center justify-between">
      <Link
        href={`/profile/${user.id}/trades`}
        className="flex flex-row gap-2 items-center hover:opacity-60 min-w-0"
      >
        <Avatar>
          <AvatarImage src={`/icons/${user.icon}.png`} />
          <AvatarFallback>{displayedName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium truncate">{displayedName}</span>
      </Link>
      <Button
        onClick={handleSignOut}
        variant="secondary"
        size="icon"
        className="bg-yellow-300 hover:bg-yellow-500 flex-shrink-0"
      >
        <HiOutlineLogout />
      </Button>
    </div>
  );
};

export default HeaderProfile;

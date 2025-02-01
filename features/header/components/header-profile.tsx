"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useConnectedUser } from "@/hooks/use-connected-user";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const HeaderProfile: FC = () => {
  const {
    selectors: { user, isLoading },
    actions: { handleSignOut },
  } = useConnectedUser();

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
    <div className="flex flex-row gap-2 items-center">
      <Avatar>
        <AvatarImage src="/icons/blue-icon.png" />
        <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
      </Avatar>
      <span>{user.email}</span>
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  );
};

export default HeaderProfile;

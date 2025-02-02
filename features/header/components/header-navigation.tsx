"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import { cn } from "@/lib/utils";

export const HeaderNavigation: FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex flex-row gap-4 items-center max-sm:hidden">
      <Link
        href="/trades"
        className={cn(
          "mt-2 pb-1",
          isActive("/trades") && "font-bold text-[#F01616] border-b-2 border-[#F01616]"
        )}
      >
        Trades
      </Link>
      <Link
        href="/trades/create"
        className={cn(
          "mt-2 pb-1",
          isActive("/trades/create") && "font-bold text-[#F01616] border-b-2 border-[#F01616]"
        )}
      >
        Create Trade
      </Link>
    </nav>
  );
};

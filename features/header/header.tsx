import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import HeaderProfile from "@/features/header/components/header-profile";
import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="w-full py-4 border-b">
      <div className="flex flex-row justify-between items-center w-full px-4">
        <Link href="/auth" className="flex flex-row gap-2 items-center">
          <div className="w-10 h-10">
            <TradeMatcherLogo className="w-10 h-10" />
          </div>
          <span className="text-primary text-2xl font-bold">Trade Matcher</span>
        </Link>
        <HeaderProfile />
      </div>
    </header>
  );
};

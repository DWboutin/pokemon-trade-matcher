import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import { HeaderMobileNavigation } from "@/features/header/components/header-mobile-navigation";
import { HeaderNavigation } from "@/features/header/components/header-navigation";
import HeaderProfile from "@/features/header/components/header-profile";
import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="w-full py-4 relative after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[20px] after:bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.15),transparent_70%)]">
      <div className="flex flex-row justify-between items-center w-full max-sm:px-4">
        <div className="flex flex-row gap-10 items-center">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <div className="w-10 h-10">
              <TradeMatcherLogo className="w-10 h-10" />
            </div>
            <span className="text-primary text-2xl font-bold">
              Poke<span className="text-[#F01616]">Swap</span>.io
            </span>
          </Link>
          <HeaderNavigation />
        </div>
        <div className="flex flex-row gap-2 max-md:hidden">
          <HeaderProfile />
        </div>
        <HeaderMobileNavigation />
      </div>
    </header>
  );
};

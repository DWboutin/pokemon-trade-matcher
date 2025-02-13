"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import { Typography } from "@/components/typography";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import HeaderProfile from "@/features/header/components/header-profile";

export const HeaderMobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="hidden max-md:block mt-2">
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <div className="flex flex-row gap-2 items-center w-8 h-8">
            <RxHamburgerMenu className="w-8 h-8" />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="sr-only">PokeSwap.io</DrawerTitle>
          <DrawerHeader>
            <div className="flex flex-row gap-2 justify-center">
              <Link href="/" className="flex flex-row gap-2 items-center">
                <div className="w-10 h-10">
                  <TradeMatcherLogo className="w-10 h-10" />
                </div>
                <span className="text-primary text-2xl font-bold">
                  Poke<span className="text-[#F01616]">Swap</span>.io
                </span>
              </Link>
            </div>
          </DrawerHeader>
          <nav className="flex flex-col gap-4 mx-8 mt-8">
            <Link
              href="/trades"
              className={cn(
                "text-xl mt-2 pb-1",
                isActive("/trades") && "font-bold text-[#F01616] border-b-2 border-[#F01616]"
              )}
            >
              Trades
            </Link>
            <Link
              href="/trades/create"
              className={cn(
                "text-xl mt-2 pb-1",
                isActive("/trades/create") && "font-bold text-[#F01616] border-b-2 border-[#F01616]"
              )}
            >
              Create Trade
            </Link>
          </nav>
          <DrawerFooter>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="w-full bg-gray-100 rounded-md p-2">
                <HeaderProfile />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <Link href="https://tcgpocket.pokemon.com/en-us/" target="_blank">
                  <Image
                    src="/logos/tcgpocketlogo_en-2x.webp"
                    alt="Pokemon TCG Pocket Logo"
                    width={100}
                    height={100}
                  />
                </Link>
                <Typography
                  variant="p"
                  text="Unofficial Pokemon TCG Pocket PokeSwap.io"
                  className="text-center text-gray-500"
                />
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

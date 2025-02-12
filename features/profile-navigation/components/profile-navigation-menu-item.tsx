"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ProfileNavigationMenuItemProps = {
  href: string;
  label: string;
};

export const ProfileNavigationMenuItem = ({ href, label }: ProfileNavigationMenuItemProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          "border-2 border-white",
          navigationMenuTriggerStyle(),
          pathname === href && "text-accent-foreground bg-accent font-bold border-gray-200"
        )}
      >
        <Link href={href} className="text-xl">
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

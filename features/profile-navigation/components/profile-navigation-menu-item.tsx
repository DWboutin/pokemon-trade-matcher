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
          navigationMenuTriggerStyle(),
          pathname === href && "text-accent-foreground bg-accent"
        )}
      >
        <Link href={href} className="text-xl font-medium">
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

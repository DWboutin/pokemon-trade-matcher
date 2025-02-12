import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ProfileNavigationMenuItem } from "@/features/profile-navigation/components/profile-navigation-menu-item";

type ProfileNavigationMenuProps = {
  userId: string;
};

export const ProfileNavigationMenu = ({ userId }: ProfileNavigationMenuProps) => {
  const links = [
    {
      href: `/profile/${userId}/trades`,
      label: "Trades",
    },
    {
      href: `/profile/${userId}/offers`,
      label: "Offers",
    },
    {
      href: `/profile/${userId}/account`,
      label: "Account",
    },
  ];

  return (
    <NavigationMenu className="after:absolute">
      <NavigationMenuList>
        {links.map((link) => (
          <ProfileNavigationMenuItem key={link.href} {...link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

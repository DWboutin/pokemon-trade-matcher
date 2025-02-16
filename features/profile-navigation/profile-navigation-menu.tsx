import { getUserData } from "@/actions/get-user-data";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ProfileNavigationMenuItem } from "@/features/profile-navigation/components/profile-navigation-menu-item";

type ProfileNavigationMenuProps = {
  userId: string;
};

export const ProfileNavigationMenu = async ({ userId }: ProfileNavigationMenuProps) => {
  const user = await getUserData();
  let links = [
    {
      href: `/profile/${userId}/trades`,
      label: "Trades",
    },
    {
      href: `/profile/${userId}/offers`,
      label: "Offers",
    },
  ];

  if (user && user.id === userId) {
    links = [
      ...links,
      {
        href: `/profile/${userId}/notifications`,
        label: "Notifications",
      },
      {
        href: `/profile/${userId}/account`,
        label: "Account",
      },
    ];
  }

  return (
    <div className="w-full overflow-x-auto md:justify-center max-md:px-4 flex scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <ProfileNavigationMenuItem key={link.href} {...link} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

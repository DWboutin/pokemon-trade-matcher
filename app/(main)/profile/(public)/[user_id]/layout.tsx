/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserById } from "@/utils/requests/get-user-by-id";
import { ProfileHeaderInfo } from "@/components/profile-header-info";
import { notFound } from "next/navigation";
import { ProfileNavigationMenu } from "@/features/profile-navigation/profile-navigation-menu";
import { Metadata } from "next";
import { currentOrigin } from "@/utils/contants";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { user_id } = params;
  const user = await getUserById(user_id);

  if (!user) {
    return {
      title: "Profile Not Found | PokeSwap.io",
      description: "This profile could not be found on PokeSwap.io.",
    };
  }

  const iconUrl = user?.icon
    ? `${currentOrigin}/icons/${user.icon}.png`
    : `${currentOrigin}/icons/blue.png`;

  return {
    title: `${user.username}'s Profile | PokeSwap.io`,
    description: `View ${user.username}'s Pokemon TCG Pocket profile on PokeSwap.io. Connect with other players, find trades, and build your collection.`,
    keywords:
      "Pokemon TCG Pocket, trading cards, card marketplace, Pokemon card trading, TCG Pocket exchange, rare Pokemon cards",
    openGraph: {
      title: `${user.username}'s Profile | PokeSwap.io`,
      description: `View ${user.username}'s Pokemon TCG Pocket profile on PokeSwap.io`,
      images: [
        {
          url: iconUrl,
          width: 400,
          height: 400,
          alt: `${user.username}'s profile picture`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${user.username}'s Profile | PokeSwap.io`,
      description: `View ${user.username}'s Pokemon TCG Pocket profile on PokeSwap.io`,
      images: [iconUrl],
    },
  };
}

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { user_id } = await params;
  const user = await getUserById(user_id);

  if (!user) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-10 py-10 items-center">
        <ProfileHeaderInfo user={user} />
        <ProfileNavigationMenu userId={user_id} />
        <div className="flex flex-1 w-full flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}

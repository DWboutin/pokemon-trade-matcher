import { useConnectedUserStore } from "@/stores/connected-user-store";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { currentOrigin } from "@/utils/contants";

export const metadata: Metadata = {
  title: "PokeSwap.io - Trade Cards & Connect with Players",
  description:
    "PokeSwap.io is the community platform for Pokemon TCG Pocket players to find, connect, and trade cards. Create trade listings, discover rare cards, and build your collection with fellow trainers.",
  openGraph: {
    title: "Pokemon TCG Pocket Trading | PokeSwap.io",
    description:
      "Find, connect and trade Pokemon TCG Pocket cards with fellow trainers. Create listings, discover rare cards & build your collection.",
    type: "website",
    url: currentOrigin,
    siteName: "PokeSwap.io",
    locale: "en_US",
    images: [
      {
        url: `${currentOrigin}/logos/pokeswap.png`,
        width: 1024,
        height: 1024,
        alt: "PokeSwap.io Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokemon TCG Pocket Trading | PokeSwap.io",
    description: "Find, connect and trade Pokemon TCG Pocket cards with fellow trainers",
    images: [`${currentOrigin}/logos/pokeswap.png`],
  },
};

export default async function Home() {
  const user = await useConnectedUserStore.getState().fetchUserData();
  useConnectedUserStore.setState({ user });

  if (user && (!user.friend_id || !user.username)) {
    return redirect(`/profile/${user.id}/account?redirected=true`);
  }

  return <div className="container mx-auto">Home</div>;
}

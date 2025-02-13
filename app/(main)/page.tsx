import { useConnectedUserStore } from "@/stores/connected-user-store";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokeSwap.io - Trade Cards & Connect with Players",
  description:
    "PokeSwap.io is the community platform for Pokemon TCG Pocket players to find, connect, and trade cards. Create trade listings, discover rare cards, and build your collection with fellow trainers.",
};

export default async function Home() {
  const user = await useConnectedUserStore.getState().fetchUserData();
  useConnectedUserStore.setState({ user });

  if (user && (!user.friend_id || !user.username)) {
    return redirect(`/profile/${user.id}/account?redirected=true`);
  }

  return <div className="container mx-auto">Home</div>;
}

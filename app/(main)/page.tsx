import { useConnectedUserStore } from "@/stores/connected-user-store";
import { currentOrigin } from "@/utils/contants";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await useConnectedUserStore.getState().fetchUserData();
  useConnectedUserStore.setState({ user });

  if (user && (!user.friend_id || !user.username)) {
    return redirect("/profile/friend-info?redirected=true");
  }

  return <div className="container mx-auto">{currentOrigin}</div>;
}

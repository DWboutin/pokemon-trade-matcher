import { useConnectedUserStore } from "@/stores/connected-user-store";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await useConnectedUserStore.getState().fetchUserData();
  useConnectedUserStore.setState({ user });

  console.log({ user });

  if (!user) {
    return redirect("/auth");
  }

  // if (!user.friend_id || !user.username) {
  //   return redirect("/setup-profile");
  // }

  return <div className="container mx-auto">Home</div>;
}

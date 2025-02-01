import { getUserData } from "@/actions/get-user-data";
import { Header } from "@/features/header/header";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserData();

  console.log(user);
  if (!user) {
    return redirect("/auth");
  }

  // if (!user.friend_id || !user.username) {
  //   return redirect("/setup-profile");
  // }

  return <div className="container mx-auto">Home</div>;
}

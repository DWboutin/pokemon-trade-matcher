import { getUserData } from "@/actions/get-user-data";
import { Header } from "@/features/header/header";

export default async function Home() {
  const user = await getUserData();

  return (
    <div className="container mx-auto">
      <Header />
    </div>
  );
}

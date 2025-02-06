import { getUserData } from "@/actions/get-user-data";
import { Typography } from "@/components/typography";
import { TradeCreatorForm } from "@/features/trade-creator-form/trade-creator-form";
import { redirect } from "next/navigation";

export default async function TradesCreatePage() {
  const user = await getUserData();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Typography variant="h1" text="Create Trade" />
        <TradeCreatorForm />
      </div>
    </div>
  );
}

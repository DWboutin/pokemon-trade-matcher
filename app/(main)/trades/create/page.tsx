import { getUserData } from "@/actions/get-user-data";
import { Typography } from "@/components/typography";
import { TradeCreatorForm } from "@/features/trade-creator-form/trade-creator-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create a Pokemon TCG Pocket Trade | List Your Cards | PokeSwap.io",
  description:
    "Create a new Pokemon TCG Pocket trade listing on PokeSwap.io. List your cards, specify what you're looking for, and connect with traders to make exchanges. Easy card trading platform for Pokemon TCG Pocket collectors.",
  keywords:
    "create Pokemon TCG trade, list Pokemon cards, make trade offer, Pokemon card exchange, TCG Pocket trading, list cards for trade",
  openGraph: {
    title: "Create a Pokemon TCG Pocket Trade | PokeSwap.io",
    description:
      "List your Pokemon TCG Pocket cards for trade. Specify what you want and connect with traders to make exchanges.",
    type: "website",
  },
};

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

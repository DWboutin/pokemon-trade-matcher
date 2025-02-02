import { Typography } from "@/components/typography";
import { TradeCreatorForm } from "@/features/trade-creator-form/trade-creator-form";

export default async function TradesCreatePage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 py-10 items-center">
        <Typography variant="h1" text="Create Trade" />
        <TradeCreatorForm />
      </div>
    </div>
  );
}

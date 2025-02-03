import { TradePageContent } from "@/features/trade-page-content/trade-page-content";
import { getSingleTrade } from "@/utils/requests/get-single-trade";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramsValues = await params;
  const data = await getSingleTrade(paramsValues.id);

  if (!data) {
    return notFound();
  }

  if (data.mainCard) {
    return {
      title: `Searching for ${data.mainCard?.cardName} ${data.mainCard?.exclusivePack.name} (${data.mainCard?.exclusivePack.series}) card - Trade Matcher`,
      description: `Searching for ${data.mainCard?.cardName} ${data.mainCard?.exclusivePack.name} (${data.mainCard?.exclusivePack.series}) card to trade in Pokemon TCG pocket application`,
    };
  } else {
    const offeredCardNames = data.offeredCards.map((card) => `${card.cardName}`).join(",");

    return {
      title: `Offering ${offeredCardNames} for a trade - Trade Matcher`,
      description: `Offering ${offeredCardNames} for a trade in Pokemon TCG pocket application`,
    };
  }
};

const TradePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramsValues = await params;
  const data = await getSingleTrade(paramsValues.id);

  if (!data) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <TradePageContent trade={data} />
    </div>
  );
};

export default TradePage;

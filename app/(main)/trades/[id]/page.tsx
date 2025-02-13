import { TradePageContent } from "@/features/trade-page-content/trade-page-content";
import { getPaginatedOffersForTradeId } from "@/utils/requests/get-paginated-offers-for-trade-id";
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
      title: `Searching for ${data.mainCard?.cardName} ${data.mainCard?.exclusivePack.name} (${data.mainCard?.exclusivePack.series}) card - PokeSwap.io`,
      description: `Searching for ${data.mainCard?.cardName} ${data.mainCard?.exclusivePack.name} (${data.mainCard?.exclusivePack.series}) card to trade in Pokemon TCG pocket application`,
    };
  } else {
    const offeredCardNames = data.offeredCards.map((card) => `${card.cardName}`).join(",");

    return {
      title: `Offering ${offeredCardNames} for a trade - PokeSwap.io`,
      description: `Offering ${offeredCardNames} for a trade in Pokemon TCG pocket application`,
    };
  }
};

const TradePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramsValues = await params;
  const [data, initialOffers] = await Promise.all([
    getSingleTrade(paramsValues.id),
    getPaginatedOffersForTradeId({ tradeId: paramsValues.id }),
  ]);

  if (!data) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <TradePageContent trade={data} initialOffers={initialOffers} />
    </div>
  );
};

export default TradePage;

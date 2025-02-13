import { TradePageContent } from "@/features/trade-page-content/trade-page-content";
import { currentOrigin } from "@/utils/contants";
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
      keywords: `${data.mainCard?.cardName}, ${data.mainCard?.exclusivePack.name}, ${data.mainCard?.exclusivePack.series}, Pokemon TCG Pocket, trading cards`,
      openGraph: {
        title: `Trading ${data.mainCard?.cardName} | PokeSwap.io`,
        description: `Looking to trade ${data.mainCard?.cardName} from ${data.mainCard?.exclusivePack.name} (${data.mainCard?.exclusivePack.series}). Connect and trade on PokeSwap.io`,
        type: "website",
        images: [
          {
            url: `${currentOrigin}/cards/${data.mainCard.cardNumber.replace(/\s/g, "_")}.png`,
            width: 490,
            height: 683,
            alt: `${data.mainCard.cardName} Pokemon Card`,
          },
        ],
      },
    };
  } else {
    const offeredCardNames = data.offeredCards.map((card) => `${card.cardName}`).join(", ");
    const offeredPackDetails = data.offeredCards
      .map((card) => `${card.exclusivePack.name} (${card.exclusivePack.series})`)
      .join(", ");

    return {
      title: `Offering ${offeredCardNames} for a trade - PokeSwap.io`,
      description: `Offering ${offeredCardNames} from ${offeredPackDetails} for trade in Pokemon TCG pocket application`,
      keywords: `${offeredCardNames}, Pokemon TCG Pocket, trading cards, card exchange`,
      openGraph: {
        title: `Trading Multiple Cards | PokeSwap.io`,
        description: `Trading ${offeredCardNames} from ${offeredPackDetails}. Find great trades on PokeSwap.io`,
        type: "website",
        images: data.offeredCards.map((card) => ({
          url: `${currentOrigin}/cards/${card.cardNumber.replace(/\s/g, "_")}.png`,
          width: 490,
          height: 683,
          alt: `${card.cardName} Pokemon Card`,
        })),
      },
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentOrigin, NON_POKEMON_TYPES } from "@/utils/contants";
import { unslugifyCard } from "@/utils/slugifyCard";
import { getCardByCardNumber } from "@/utils/requests/get-card-by-card-number";
import { CardInfoHeading } from "@/components/sections/card-info-heading";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CardInfoGameDetails } from "@/components/sections/card-info-game-details";
import { CardInfoMoves } from "@/components/sections/card-info-moves";
import { CardInfoEvolutions } from "@/components/sections/card-info-evolutions";
import { CardInfoVariations } from "@/components/sections/card-info-variations";

export const dynamic = "force-static";

export const generateMetadata = async ({ params }: { params: Promise<{ card_slug: string }> }) => {
  const paramsValues = await params;
  const { cardName, cardNumber } = unslugifyCard(paramsValues.card_slug);
  const card = await getCardByCardNumber(cardNumber);

  if (!card) {
    return {
      title: "Card Not Found | PokeSwap.io",
      description: "The requested Pokemon card could not be found.",
    };
  }

  return {
    title: `${cardName} ${cardNumber} | Pokemon TCG Pocket Card | PokeSwap.io`,
    description: `View details and trade listings for ${cardName} (${cardNumber}) from ${card.exclusivePack.name} (${card.exclusivePack.series}) on PokeSwap.io.`,
    keywords: `${cardName}, ${cardNumber}, ${card.exclusivePack.name}, ${card.exclusivePack.series}, Pokemon TCG Pocket, trading cards`,
    openGraph: {
      title: `${cardName} ${cardNumber} | PokeSwap.io`,
      description: `View and trade ${cardName} from ${card.exclusivePack.name} (${card.exclusivePack.series}) on PokeSwap.io`,
      type: "website",
      url: `${currentOrigin}/library/${paramsValues.card_slug}`,
      siteName: "PokeSwap.io",
      locale: "en_US",
      images: [
        {
          url: `${currentOrigin}/cards/${cardNumber.replace(/\s/g, "_")}.png`,
          width: 490,
          height: 683,
          alt: `${cardName} Pokemon Card`,
        },
      ],
    },
  };
};

export default async function LibraryCardPage({ params }: { params: any }) {
  const { card_slug } = await params;
  const { cardNumber } = unslugifyCard(card_slug);
  const card = await getCardByCardNumber(cardNumber);

  if (!card) {
    return notFound();
  }

  return (
    <article className="container mx-auto">
      <div className="flex flex-col gap-6 py-10 items-center max-md:px-4">
        <div className="flex w-full flex-col gap-4 items-center">
          <CardInfoHeading card={card} mainHeading />

          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl">
            {/* First column - will be third on mobile */}
            <div className="order-3 lg:order-1">
              <CardInfoGameDetails card={card} />
            </div>

            {/* Second column - will be first on mobile */}
            <div className="order-1 lg:order-2 flex justify-center min-w-[240px]">
              <Image
                src={`/cards/${card.cardNumber.replace(/\s/g, "_")}.png`}
                alt={`${card.cardName} ${card.exclusivePack.name} ${card.exclusivePack.series}`}
                width={240}
                height={320}
                className="w-auto h-auto shadow-xl rounded-lg"
              />
            </div>

            {/* Third column - will be second on mobile */}
            <div className="order-2 lg:order-3">
              <CardInfoMoves card={card} />
            </div>
          </div>
        </div>
        {!NON_POKEMON_TYPES.includes(card.type) && (
          <div className="w-full flex flex-col gap-4">
            <CardInfoEvolutions card={card} />
            <CardInfoVariations card={card} />
          </div>
        )}
      </div>
    </article>
  );
}

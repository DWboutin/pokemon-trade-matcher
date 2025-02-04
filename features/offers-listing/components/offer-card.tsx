import { CardRarityWithImages } from "@/components/card-rarity-with-images";
import { CardTypeWithImage } from "@/components/card-type-with-image";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import Image from "next/image";

type OfferCardProps = {
  offer: PopulatedOffer;
};

const OfferCard = ({ offer }: OfferCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card text-card-foreground shadow p-4">
      <div className="flex flex-row gap-2 max-md:flex-col max-md:items-center">
        <div>
          <Image
            src={`/cards/${offer.offeredCard.cardNumber.replace(/\s/g, "_")}.png`}
            alt={`${offer.offeredCard.cardName} ${offer.offeredCard.exclusivePack.name} ${offer.offeredCard.exclusivePack.series}`}
            width={80}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CardRarityWithImages rarity={offer.offeredCard.rarity} />
          <div className="flex flex-row gap-2">
            <div className="flex-shrink-0 pt-1">
              <CardTypeWithImage type={offer.offeredCard.type} showTypeName={false} />
            </div>
            <div className="text-lg font-bold">
              {offer.offeredCard.cardName} - {offer.offeredCard.exclusivePack.name}{" "}
              {offer.offeredCard.exclusivePack.series}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

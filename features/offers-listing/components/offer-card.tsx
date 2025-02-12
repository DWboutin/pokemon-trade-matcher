import { CardRarityWithImages } from "@/components/card-rarity-with-images";
import { CardTypeWithImage } from "@/components/card-type-with-image";
import { Badge } from "@/components/ui/badge";
import { OfferCardBadge } from "@/features/offers-listing/components/offer-card-badge";
import { UserProfileInfo } from "@/features/user-profile-info/user-profile-info";
import { cn } from "@/lib/utils";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import Image from "next/image";
import { useMemo } from "react";

type OfferCardProps = {
  offer: PopulatedOffer;
  isOwner: boolean;
  handleClick: () => void;
  acceptsOffers: boolean;
};

const OfferCard = ({ offer, handleClick, isOwner, acceptsOffers }: OfferCardProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 p-4 overflow-hidden border-2 border-gray-50 border-t-white border-l-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100",
        "with-diagonal-gradient",
        isOwner && acceptsOffers && "cursor-pointer",
        offer.status === "pending" && "status-pending",
        offer.status === "accepted" && "status-accepted",
        offer.status === "rejected" && "status-rejected"
      )}
      onClick={acceptsOffers ? handleClick : undefined}
    >
      <div className="flex flex-row gap-4 max-md:flex-col max-md:items-center z-10">
        <div>
          <Image
            src={`/cards/${offer.offeredCard.cardNumber.replace(/\s/g, "_")}.png`}
            alt={`${offer.offeredCard.cardName} ${offer.offeredCard.exclusivePack.name} ${offer.offeredCard.exclusivePack.series}`}
            width={80}
            height={100}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-row justify-between gap-2">
            <CardRarityWithImages rarity={offer.offeredCard.rarity} />
            <div className="text-sm text-gray-500">
              <OfferCardBadge status={offer.status ?? "pending"} />
            </div>
          </div>
          <div className="flex flex-1 flex-row gap-2">
            <div className="flex-shrink-0 pt-1">
              <CardTypeWithImage type={offer.offeredCard.type} showTypeName={false} />
            </div>
            <div className="text-lg font-bold">
              {offer.offeredCard.cardName} - {offer.offeredCard.exclusivePack.name}{" "}
              {offer.offeredCard.exclusivePack.series}
            </div>
          </div>
          <div className="flex justify-end flex-shrink-0 ml-auto">
            <UserProfileInfo
              username={offer.author.username}
              icon={offer.author.icon}
              friendId={offer.author.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

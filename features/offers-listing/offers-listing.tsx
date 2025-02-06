"use client";

import OfferCard from "@/features/offers-listing/components/offer-card";
import { useOfferActionModal } from "@/features/offers-listing/hooks/use-offer-action-modal";
import { useOffersListing } from "@/features/offers-listing/hooks/use-offers-listing";
import { CardData } from "@/types/app";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import dynamic from "next/dynamic";
import { FC } from "react";

const OfferCardActionModal = dynamic(
  () =>
    import("@/features/offers-listing/components/offer-card-action-modal").then(
      (mod) => mod.OfferCardActionModal
    ),
  { ssr: false }
);

type OffersListingProps = {
  tradeId: string;
  initialData: PopulatedOffer[];
  tradeOwnerId: string;
  ownerCard: CardData | null;
  acceptsOffers: boolean;
};

export const OffersListing: FC<OffersListingProps> = ({
  tradeId,
  initialData,
  tradeOwnerId,
  ownerCard,
  acceptsOffers,
}) => {
  const {
    selectors: { parentRef, rowVirtualizer, items, allRows, hasNextPage },
  } = useOffersListing({ initialData, tradeId });
  const {
    selectors: { isModalOpen, isStatusUpdating, offerData, isOwner },
    actions: { setIsModalOpen, handleOfferCardClick, handleOfferStatusUpdate },
  } = useOfferActionModal({ tradeId, tradeOwnerId });

  return (
    <>
      <div ref={parentRef} className="w-full h-full">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {items.map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const offer = allRows[virtualRow.index];

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="pb-4"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow
                  ? hasNextPage
                    ? "Loading more..."
                    : "Nothing more to load"
                  : offer && (
                      <OfferCard
                        offer={offer}
                        handleClick={() => handleOfferCardClick(offer)}
                        isOwner={isOwner}
                        acceptsOffers={acceptsOffers}
                      />
                    )}
              </div>
            );
          })}
        </div>
      </div>
      {isOwner && offerData && ownerCard && (
        <OfferCardActionModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          ownerCard={ownerCard}
          offeredCard={offerData?.offeredCard}
          handleOfferStatusUpdate={handleOfferStatusUpdate}
          isStatusUpdating={isStatusUpdating}
        />
      )}
    </>
  );
};

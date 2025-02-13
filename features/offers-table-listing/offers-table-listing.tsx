"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { useOffersTableListing } from "@/features/offers-table-listing/hooks/use-offers-table-listing";
import Image from "next/image";
import { OfferCardBadge } from "@/features/offers-listing/components/offer-card-badge";
import { OffersTableCancelButton } from "@/features/offers-table-listing/components/offers-table-cancel-button";

type OffersTableListingProps = {
  initialData: PopulatedOffer[];
  authorId?: string;
  status?: "pending" | "accepted" | "rejected";
  isOwner: boolean;
};

export const OffersTableListing: FC<OffersTableListingProps> = ({
  initialData,
  authorId,
  isOwner,
  status,
}) => {
  const router = useRouter();
  const {
    selectors: { parentRef, rowVirtualizer, items, allRows, hasNextPage },
  } = useOffersTableListing({ initialData, authorId, status });

  const handleRowClick = (tradeId: string) => {
    router.push(`/trades/${tradeId}`);
  };

  return (
    <div ref={parentRef} className="w-full flex flex-col">
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[600px] h-full">
          {/* Header */}
          <div className="flex px-4 py-3 font-semibold">
            <div className={isOwner ? "w-[35%]" : "w-[40%]"}>Wanted Card</div>
            <div className={isOwner ? "w-[35%]" : "w-[40%]"}>Offered Card</div>
            <div className={isOwner ? "w-[15%]" : "w-[20%]"}>Status</div>
            {isOwner && <div className="w-[15%] text-right">Actions</div>}
          </div>

          {allRows.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-gray-500">
              No offers found
            </div>
          ) : (
            <div
              className="relative overflow-hidden"
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
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
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className={`
                      flex px-4 py-2
                      ${
                        !isLoaderRow
                          ? "cursor-pointer hover:bg-muted/70 odd:bg-gray-100 even:rounded-md"
                          : ""
                      }
                    `}
                    onClick={() => !isLoaderRow && offer && handleRowClick(offer.trade_id)}
                  >
                    {isLoaderRow ? (
                      <div className="w-full text-center h-[72px]">
                        {hasNextPage ? "Loading more..." : "Nothing more to load"}
                      </div>
                    ) : (
                      offer && (
                        <>
                          <div className={isOwner ? "w-[35%]" : "w-[40%]"}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/cards/${offer.wantedCard.cardNumber.replace(
                                  /\s/g,
                                  "_"
                                )}.png`}
                                alt={offer.wantedCard.cardName}
                                width={51}
                                height={72}
                              />
                              <span className="truncate">
                                {offer.wantedCard.cardName}{" "}
                                <span className="text-sm text-gray-500 max-md:hidden">
                                  {offer.wantedCard.exclusivePack.name}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className={isOwner ? "w-[35%]" : "w-[40%]"}>
                            <div className="flex items-center gap-2">
                              <Image
                                src={`/cards/${offer.offeredCard.cardNumber.replace(
                                  /\s/g,
                                  "_"
                                )}.png`}
                                alt={offer.offeredCard.cardName}
                                width={51}
                                height={72}
                                title={offer.offeredCard.cardName}
                              />
                              <span className="truncate flex flex-row gap-2 items-center">
                                {offer.offeredCard.cardName}
                                <span className="text-sm text-gray-500 max-md:hidden">
                                  {offer.offeredCard.exclusivePack.name}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className={`flex items-center ${isOwner ? "w-[15%]" : "w-[20%]"}`}>
                            <OfferCardBadge status={offer.status ?? "pending"} />
                          </div>
                          {isOwner && (
                            <div className="w-[15%] flex items-center justify-end">
                              <OffersTableCancelButton
                                offerId={offer.id}
                                tradeId={offer.trade_id}
                                disabled={offer.status !== "pending"}
                              />
                            </div>
                          )}
                        </>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

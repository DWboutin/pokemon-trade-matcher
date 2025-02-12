"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { useOffersTableListing } from "@/features/offers-table-listing/hooks/use-offers-table-listing";
import Image from "next/image";
import { OfferCardBadge } from "@/features/offers-listing/components/offer-card-badge";
import { OffersTableCancelButton } from "@/features/offers-table-listing/components/offers-table-cancel-button";

type OffersTableListingProps = {
  initialData: PopulatedOffer[];
  authorId?: string;
  status?: "all" | "pending" | "ended";
  isOwner: boolean;
};

export const OffersTableListing: FC<OffersTableListingProps> = ({
  initialData,
  authorId,
  isOwner,
}) => {
  const router = useRouter();
  const {
    selectors: { parentRef, rowVirtualizer, items, allRows, hasNextPage },
  } = useOffersTableListing({ initialData, authorId });

  const handleRowClick = (tradeId: string) => {
    router.push(`/trades/${tradeId}`);
  };

  return (
    <div ref={parentRef} className="w-full h-full overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="table-fixed overflow-hidden min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className={`${isOwner ? "w-[35%]" : "w-[40%]"} pl-4 font-semibold`}>
                Wanted Card
              </TableHead>
              <TableHead className={`${isOwner ? "w-[35%]" : "w-[40%]"} font-semibold`}>
                Offered Card
              </TableHead>
              <TableHead className={`${isOwner ? "w-[15%]" : "w-[20%]"} font-semibold`}>
                Status
              </TableHead>
              {isOwner && (
                <TableHead className="w-[15%] font-semibold text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody
            className="relative overflow-hidden"
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
                <TableRow
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                    display: "flex",
                  }}
                  className={`${
                    !isLoaderRow
                      ? "cursor-pointer hover:bg-muted/70 bg-gray-50 even:bg-gray-100"
                      : ""
                  }`}
                  onClick={() => !isLoaderRow && offer && handleRowClick(offer.trade_id)}
                >
                  {isLoaderRow ? (
                    <TableCell colSpan={3} className="text-center h-[72px] flex-1">
                      {hasNextPage ? "Loading more..." : "Nothing more to load"}
                    </TableCell>
                  ) : (
                    offer && (
                      <>
                        <TableCell className={`${isOwner ? "w-[35%]" : "w-[40%]"} pl-4`}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/cards/${offer.wantedCard.cardNumber.replace(/\s/g, "_")}.png`}
                              alt={offer.wantedCard.cardName}
                              width={51}
                              height={72}
                            />
                            <span className="truncate">
                              {offer.wantedCard.cardName} {offer.wantedCard.exclusivePack.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className={`${isOwner ? "w-[35%]" : "w-[40%]"}`}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/cards/${offer.offeredCard.cardNumber.replace(/\s/g, "_")}.png`}
                              alt={offer.offeredCard.cardName}
                              width={51}
                              height={72}
                              title={offer.offeredCard.cardName}
                            />
                            <span className="truncate">
                              {offer.offeredCard.cardName} {offer.offeredCard.exclusivePack.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`${isOwner ? "w-[15%]" : "w-[20%]"} flex items-center`}
                        >
                          <OfferCardBadge status={offer.status ?? "pending"} />
                        </TableCell>
                        {isOwner && (
                          <TableCell className="w-[15%] flex items-center justify-end">
                            <OffersTableCancelButton
                              offerId={offer.id}
                              tradeId={offer.trade_id}
                              disabled={offer.status !== "pending"}
                            />
                          </TableCell>
                        )}
                      </>
                    )
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

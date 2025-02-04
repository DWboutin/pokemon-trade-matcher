"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CardData } from "@/types/app";
import { FC } from "react";
import { CardImage } from "@/components/card-image";

type CardsListingProps = {
  cards: CardData[];
  selectedCardId: string | null;
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

export const CardsListing: FC<CardsListingProps> = ({
  cards,
  selectedCardId,
  handleCardClick,
  children,
}) => {
  const parentRef = useRef(null);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: cards.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 216,
    overscan: 5,
  });

  if (cards.length === 0) {
    return <div className="w-full flex items-center justify-center py-9">{children}</div>;
  }

  return (
    <>
      <div ref={parentRef} className="w-full h-72 overflow-auto overflow-y-hidden">
        <div
          style={{
            width: `${columnVirtualizer.getTotalSize()}px`,
            height: "100%",
            position: "relative",
          }}
        >
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.index}
              className={virtualColumn.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${virtualColumn.size}px`,
                transform: `translateX(${virtualColumn.start}px)`,
              }}
            >
              <CardImage
                card={cards[virtualColumn.index]}
                handleClick={handleCardClick}
                selectedCardId={selectedCardId}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

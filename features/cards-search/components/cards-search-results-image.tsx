"use client";

import { CardData } from "@/types/app";
import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardsSearchResultsImageProps = {
  card: CardData;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  selectedCardId: string | null;
};

export const CardsSearchResultsImage: FC<CardsSearchResultsImageProps> = ({
  card,
  handleClick,
  selectedCardId,
}) => {
  const src = `/cards/${card.cardNumber.replace(/\s/g, "_")}.png`;
  const alt = `${card.cardName} ${card.exclusivePack.name} ${card.exclusivePack.series}`;

  return (
    <div
      className={cn("w-full h-full mr-4", {
        "opacity-100": selectedCardId === card.cardNumber || selectedCardId === null,
        "opacity-50": selectedCardId !== null && selectedCardId !== card.cardNumber,
      })}
      data-card-id={card.cardNumber}
      onClick={handleClick}
    >
      <Image src={src} alt={alt} width={200} height={279} />
    </div>
  );
};

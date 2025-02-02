import { CardType } from "@/types/app";
import Image from "next/image";
import { FC } from "react";

const valueToImages: Record<CardType, string> = {
  Colorless: "/types/Colorless.png",
  Darkness: "/types/Darkness.png",
  Dragon: "/types/Dragon.png",
  Fighting: "/types/Fighting.png",
  Fire: "/types/Fire.png",
  Grass: "/types/Grass.png",
  Item: "/types/Item.png",
  Lightning: "/types/Lightning.png",
  Metal: "/types/Metal.png",
  "Pokemon Tool": "/types/Pokemon_Tool.png",
  Psychic: "/types/Psychic.png",
  Supporter: "/types/Supporter.png",
  Water: "/types/Water.png",
};

type CardsTypeOptionContentProps = {
  type: CardType;
};

export const CardsTypeOptionContent: FC<CardsTypeOptionContentProps> = ({ type }) => {
  const image = valueToImages[type];

  if (!image) {
    return <div className="flex items-center gap-2">{type}</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <Image src={image} alt={type} width={20} height={20} className="w-5 h-5" />
      {type}
    </div>
  );
};

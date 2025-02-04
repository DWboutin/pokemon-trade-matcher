import { CardType } from "@/types/app";
import { valueToImages } from "@/utils/contants";
import Image from "next/image";
import { FC } from "react";

type CardTypeWithImageProps = {
  type: CardType;
};

export const CardTypeWithImage: FC<CardTypeWithImageProps> = ({ type }) => {
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

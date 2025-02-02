import Image from "next/image";
import { FC } from "react";

const valueToImages = {
  "◇": "/rarities/diamond.png",
  "☆": "/rarities/star.png",
  "♛": "/rarities/crown.png",
};

type CardsRarityOptionContentProps = {
  rarity: string;
};

export const CardsRarityOptionContent: FC<CardsRarityOptionContentProps> = ({ rarity }) => {
  const firstChar = rarity[0] as keyof typeof valueToImages;
  const rarityLength = rarity.length;
  const image = firstChar in valueToImages ? valueToImages[firstChar] : null;

  return (
    <div className="flex items-center">
      {image &&
        Array.from({ length: rarityLength }).map((_, index) => (
          <Image key={index} src={image} alt={rarity} width={20} height={20} className="w-5 h-5" />
        ))}
      {!image && rarity}
    </div>
  );
};

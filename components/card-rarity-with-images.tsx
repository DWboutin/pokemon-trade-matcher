import Image from "next/image";
import { FC } from "react";

const typeToImages = {
  "◇": "/rarities/diamond.png",
  "☆": "/rarities/star.png",
  "♛": "/rarities/crown.png",
};

type CardRarityWithImagesProps = {
  rarity: string;
};

export const CardRarityWithImages: FC<CardRarityWithImagesProps> = ({ rarity }) => {
  const firstChar = rarity[0] as keyof typeof typeToImages;
  const rarityLength = rarity.length;
  const image = firstChar in typeToImages ? typeToImages[firstChar] : null;

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

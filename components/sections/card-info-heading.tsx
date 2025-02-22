import { CardRarityWithImages } from "@/components/card-rarity-with-images";
import { CardData } from "@/types/app";
import { typeToImages } from "@/utils/contants";
import Image from "next/image";

type CardInfoHeadingProps = {
  card: CardData;
  mainHeading?: boolean;
};

export const CardInfoHeading = ({ card, mainHeading = false }: CardInfoHeadingProps) => {
  const image = typeToImages[card.type];

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={`flex flex-row items-center justify-between gap-2 p-2 rounded-md bg-${card.type.toLowerCase()}`}
      >
        <div className="flex flex-row items-center gap-2">
          {card.stage && (
            <div className="py-1 px-2 text-sm bg-white rounded-md italic">{card.stage}</div>
          )}
          {mainHeading && <h1 className="py-1 px-2 text-xl font-extrabold">{card.cardName}</h1>}
          {!mainHeading && (
            <div className="py-1 px-2 text-base font-extrabold">{card.cardName}</div>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 text-base">
          {card.hp > 0 && (
            <div>
              <span className="text-xs font-bold">HP</span>
              <span className="font-extrabold">{card.hp}</span>
            </div>
          )}
          <Image src={image} alt={card.type} width={32} height={32} className="w-8 h-8" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start">
        <div className="flex flex-row items-center gap-2">
          <div className="py-1 px-2 text-sm italic">Rarity</div>
          <CardRarityWithImages rarity={card.rarity} />
        </div>

        <div className="py-1 px-2 text-base font-medium">
          {card.exclusivePack.name} - {card.exclusivePack.series}
        </div>
      </div>
    </div>
  );
};

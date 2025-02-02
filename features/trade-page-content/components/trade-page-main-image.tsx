import { CardData } from "@/types/app";
import Image from "next/image";
import { MdCatchingPokemon } from "react-icons/md";

type TradePageMainImageProps = {
  mainCard: CardData | null;
};

export const TradePageMainImage = ({ mainCard }: TradePageMainImageProps) => {
  return (
    <div>
      {mainCard && (
        <Image
          src={`/cards/${mainCard.cardNumber.replace(/\s/g, "_")}.png`}
          alt={`${mainCard.cardName} ${mainCard.exclusivePack.name} ${mainCard.exclusivePack.series}`}
          width={240}
          height={320}
        />
      )}
      {!mainCard && (
        <div className="w-[240px] h-[320px] bg-gray-200 rounded-md flex flex-col items-center justify-center gap-2">
          <MdCatchingPokemon className="w-20 h-20 text-gray-500" />
          <div className="text-xl font-bold">Any</div>
        </div>
      )}
    </div>
  );
};

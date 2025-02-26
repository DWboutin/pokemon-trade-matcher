import { Typography } from "@/components/typography";
import Image from "next/image";
import { CardData } from "@/types/app";

type TradeConnectionModalCardInfoProps = {
  card: CardData;
  isOwnCard: boolean;
};

export const TradeConnectionModalCardInfo = ({
  card,
  isOwnCard,
}: TradeConnectionModalCardInfoProps) => {
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <Typography
        variant="p"
        text={isOwnCard ? "You will trade:" : "You will receive:"}
        className="text-sm text-gray-500"
      />
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <span className="text-sm font-medium">
          {`${card.cardName} (${card.exclusivePack.name})`}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={`/cards/${card.cardNumber.replace(/\s/g, "_")}.png`}
          alt={`${card.cardName} ${card.exclusivePack.name} ${card.exclusivePack.series}`}
          width={60}
          height={87}
          style={{ width: "60px", height: "87px" }}
          className="filter drop-shadow-md"
        />
      </div>
    </div>
  );
};

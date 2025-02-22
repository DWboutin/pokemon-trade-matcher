import { CardInfoHeading } from "@/components/sections/card-info-heading";
import { CardData } from "@/types/app";

type CardPageContentProps = {
  card: CardData;
};

export const CardPageContent = ({ card }: CardPageContentProps) => {
  return (
    <>
      <CardInfoHeading card={card} />
    </>
  );
};

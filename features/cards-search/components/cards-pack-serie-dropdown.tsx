import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const cardsData: CardsData = cardsDataJson;
const packSeriesData = cardsData.cards
  .reduce<string[]>(
    (acc, card) => {
      if (!acc.find((packSeries) => packSeries === card.exclusivePack.series)) {
        acc.push(card.exclusivePack.series);
      }
      return acc;
    },
    ["All"]
  )
  .sort((a, b) => a.localeCompare(b));

export const CardsPackSerieDropdown: React.FC<
  ControllerRenderProps<{ exclusivePackSeries: string | undefined }>
> = (props) => {
  return (
    <SelectDropdown {...props} options={packSeriesData} placeholder="Select your pack serie" />
  );
};

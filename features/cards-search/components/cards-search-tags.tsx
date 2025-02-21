import { CardRarityWithImages } from "@/components/card-rarity-with-images";
import { CardTypeWithImage } from "@/components/card-type-with-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { CardType } from "@/types/app";
import { AiOutlineClose } from "react-icons/ai";
import { z } from "zod";

type CardsSearchTagsProps = {
  tagValues: z.infer<typeof cardsSearchSchema>;
  handleRemoveTag: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dirtyFields: Partial<
    Readonly<{
      cardName?: boolean | undefined;
      rarity?: boolean | undefined;
      exclusivePackName?: boolean | undefined;
      exclusivePackSeries?: boolean | undefined;
      type?: boolean | undefined;
      hp?: boolean | undefined;
      stage?: boolean | undefined;
    }>
  >;
};

const nameFormatter = (key: string) => {
  switch (key) {
    case "cardName":
      return "Name";
    case "exclusivePackName":
      return "Exclusive Pack";
    case "exclusivePackSeries":
      return "Exclusive Pack Series";
    default:
      return key;
  }
};

const renderTagValue = (key: string, value: string | number | undefined) => {
  switch (key) {
    case "rarity":
      return (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs text-gray-500">Rarity</span>
          <CardRarityWithImages rarity={value as string} />
        </div>
      );
    case "type":
      return (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs text-gray-500">Type</span>
          <CardTypeWithImage type={value as CardType} />
        </div>
      );
    case "hp":
      return (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs text-gray-500">{"HP >= "}</span>
          <span>{value}</span>
        </div>
      );
    default:
      return (
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs text-gray-500 capitalize">{nameFormatter(key)}:</span>
          <span>{value}</span>
        </div>
      );
  }
};

export const CardsSearchTags = ({
  tagValues,
  handleRemoveTag,
  dirtyFields,
}: CardsSearchTagsProps) => {
  const dirtyFieldsKeys = dirtyFields ? Object.keys(dirtyFields) : [];
  const filteredDirtyFieldsKeys = dirtyFieldsKeys.filter(
    (key) =>
      tagValues[key as keyof typeof tagValues] !== undefined &&
      tagValues[key as keyof typeof tagValues] !== ""
  );

  return (
    <div className="flex flex-wrap gap-2">
      {filteredDirtyFieldsKeys.map((key) => (
        <Badge key={`search-tag-${key}`} variant="outline" className="flex flex-row gap-2">
          {renderTagValue(key, tagValues[key as keyof typeof tagValues])}
          <Button data-tag-key={key} variant="ghost" size="icon" onClick={handleRemoveTag}>
            <AiOutlineClose />
          </Button>
        </Badge>
      ))}
    </div>
  );
};

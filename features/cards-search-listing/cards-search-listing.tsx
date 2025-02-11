import { CardsListing } from "@/components/cards-listing";
import { Typography } from "@/components/typography";
import { useCardsSearchStore } from "@/stores/cards-search-store";

type CardsSearchListingProps = {
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const CardsSearchListing = ({ handleCardClick }: CardsSearchListingProps) => {
  const cards = useCardsSearchStore((state) => state.cards);
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);

  return (
    <div id="cards-search-results">
      <CardsListing cards={cards} selectedCardId={selectedCardId} handleCardClick={handleCardClick}>
        <Typography
          variant="h3"
          text="Refine your search for cards to show here"
          className="text-muted-foreground"
        />
      </CardsListing>
    </div>
  );
};

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CardData } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { useCardsSearchStore } from "@/stores/cards-search-store";

type TradeCreatorCardModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleSearchedCardChange: () => void;
  handleOfferedCardsChange: () => void;
  searchedCard: CardData | null;
  offeredCards: CardData[];
};

export const TradeCreatorCardModal = ({
  isOpen,
  onOpenChange,
  handleSearchedCardChange,
  handleOfferedCardsChange,
  searchedCard,
  offeredCards,
}: TradeCreatorCardModalProps) => {
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);
  const selectedCard = useCardsSearchStore((state) =>
    state.cards.find((card) => card.cardNumber === selectedCardId)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How do you want to trade this card?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-4 py-4">
          <Image
            src={`/cards/${selectedCard?.cardNumber.replace(/\s/g, "_")}.png`}
            alt={`${selectedCard?.cardName} ${selectedCard?.exclusivePack.name} ${selectedCard?.exclusivePack.series}`}
            width={200}
            height={279}
          />
          <div className="text-center flex flex-col gap-4">
            <Typography
              variant="p"
              text={
                searchedCard === null
                  ? "You can add one card that you want to trade."
                  : "You will replace your current searched card with this one."
              }
            />
            <Button variant="default" onClick={handleSearchedCardChange}>
              I&apos;m searching for this card
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
            </div>
            {offeredCards.length < 10 && (
              <Typography
                variant="p"
                text={
                  offeredCards.length === 0
                    ? "You can add up to 10 cards that you want to offer for a trade."
                    : `You can ${offeredCards.length === 1 ? "add" : "add up to"} ${
                        10 - offeredCards.length
                      } more cards that you want to offer for a trade.`
                }
              />
            )}
            {offeredCards.length === 10 && (
              <Typography
                variant="p"
                text="You can't add more cards. You need to remove one of the cards you are offering."
              />
            )}
            <Button variant="outline" onClick={handleOfferedCardsChange}>
              I&apos;m offering this card
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

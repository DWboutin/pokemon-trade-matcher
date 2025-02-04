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
import { useCardsSearchStore } from "@/stores/cards-search-store";
import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import { Typography } from "@/components/typography";

type MakeTradeOfferModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mainCard: CardData;
};

export const MakeTradeOfferModal = ({
  isOpen,
  onOpenChange,
  mainCard,
}: MakeTradeOfferModalProps) => {
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);
  const selectedCard = useCardsSearchStore((state) =>
    state.cards.find((card) => card.cardNumber === selectedCardId)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mr-4">Create trade offer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row justify-between items-center gap-4 py-4">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-sm font-bold text-gray-600">I want to offer</span>
            <Image
              src={`/cards/${selectedCard?.cardNumber.replace(/\s/g, "_")}.png`}
              alt={`${selectedCard?.cardName} ${selectedCard?.exclusivePack.name} ${selectedCard?.exclusivePack.series}`}
              width={200}
              height={279}
              className="max-md:w-[120px]"
            />
          </div>
          <TradeMatcherLogo className="w-14 h-14" />
          <div className="flex flex-col gap-2 text-center">
            <span className="text-sm font-bold text-gray-600">To get</span>
            <Image
              src={`/cards/${mainCard?.cardNumber.replace(/\s/g, "_")}.png`}
              alt={`${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}`}
              width={200}
              height={279}
              className="max-md:w-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex flex-row gap-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="default">Create trade offer</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

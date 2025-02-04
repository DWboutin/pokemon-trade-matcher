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
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type MakeTradeOfferModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  mainCard: CardData;
  handleCreateOffer: (selectedCardNumber: string) => Promise<void>;
};

export const MakeTradeOfferModal = ({
  isOpen,
  isLoading,
  onOpenChange,
  mainCard,
  handleCreateOffer,
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
              <Button
                variant="default"
                disabled={!selectedCard}
                onClick={() => handleCreateOffer(selectedCard?.cardNumber as string)}
              >
                {isLoading && (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Creating trade offer...
                  </>
                )}
                {!isLoading && "Create trade offer"}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

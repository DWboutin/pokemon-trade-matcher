import Image from "next/image";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CardData } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";

type CardsSearchModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  card: CardData | null;
};

export const CardsSearchModal = ({ isOpen, onOpenChange, card }: CardsSearchModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How do you want to trade this card?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-4 py-4">
          <Image
            src={`/cards/${card?.cardNumber.replace(/\s/g, "_")}.png`}
            alt={`${card?.cardName} ${card?.exclusivePack.name} ${card?.exclusivePack.series}`}
            width={200}
            height={279}
          />
          <div className="text-center flex flex-col gap-4">
            <Typography variant="p" text="You can add one card that you want to trade." />
            <Button variant="default">I'm searching for this card</Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
            </div>
            <Typography
              variant="p"
              text="You can add up to 10 cards that you want to offer for a trade."
            />
            <Button variant="outline">I'm offering this card</Button>
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

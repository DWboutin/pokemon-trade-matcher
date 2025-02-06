import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CardData, OfferStatus } from "@/types/app";
import { Button } from "@/components/ui/button";
import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import { ButtonLoading } from "@/components/ui/button-loading";

type OfferCardActionModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ownerCard: CardData;
  offeredCard: CardData;
  handleOfferStatusUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isStatusUpdating: Omit<OfferStatus, "pending"> | null;
};

export const OfferCardActionModal = ({
  isOpen,
  onOpenChange,
  ownerCard,
  offeredCard,
  handleOfferStatusUpdate,
  isStatusUpdating,
}: OfferCardActionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mr-4">Offer details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row justify-between items-center gap-4 py-4">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-sm font-bold text-gray-600">Exchanging this card</span>
            <Image
              src={`/cards/${ownerCard?.cardNumber.replace(/\s/g, "_")}.png`}
              alt={`${ownerCard?.cardName} ${ownerCard?.exclusivePack.name} ${ownerCard?.exclusivePack.series}`}
              width={200}
              height={279}
              className="max-md:w-[120px]"
            />
          </div>
          <TradeMatcherLogo className="w-14 h-14" />
          <div className="flex flex-col gap-2 text-center">
            <span className="text-sm font-bold text-gray-600">To get</span>
            <Image
              src={`/cards/${offeredCard?.cardNumber.replace(/\s/g, "_")}.png`}
              alt={`${offeredCard?.cardName} ${offeredCard?.exclusivePack.name} ${offeredCard?.exclusivePack.series}`}
              width={200}
              height={279}
              className="max-md:w-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex flex-row gap-2 justify-end">
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogClose>
          <Button
            variant="destructive"
            data-offer-status="rejected"
            onClick={handleOfferStatusUpdate}
          >
            {isStatusUpdating === "rejected" && <ButtonLoading>Rejecting...</ButtonLoading>}
            {isStatusUpdating !== "rejected" && "Reject offer"}
          </Button>
          <Button variant="default" data-offer-status="accepted" onClick={handleOfferStatusUpdate}>
            {isStatusUpdating === "accepted" && <ButtonLoading>Accepting...</ButtonLoading>}
            {isStatusUpdating !== "accepted" && "Accept offer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

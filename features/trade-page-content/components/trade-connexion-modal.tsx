"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import { useConnectedUserStore } from "@/stores/connected-user-store";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";

type TradeConnexionModalProps = {
  acceptedOffer: PopulatedOffer;
};

export const TradeConnexionModal = ({ acceptedOffer }: TradeConnexionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const user = useConnectedUserStore((state) => state.user);

  console.log({ acceptedOffer });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>It&apos;s time to connect</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">content</div>
        <DialogFooter className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="default" type="submit" onClick={() => {}}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

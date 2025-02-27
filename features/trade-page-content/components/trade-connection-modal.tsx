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
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { Typography } from "@/components/typography";
import { formatFriendId } from "@/utils/friendIdFormatters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TradeConnectionModalCardInfo } from "@/features/trade-page-content/components/trade-connection-modal-card-info";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmAlertModal } from "@/components/confirm-alert-modal";
import { updateTradeCompletedStatus } from "@/actions/update-trade-completed-status";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type TradeConnectionModalProps = {
  acceptedOffer: PopulatedOffer;
  trade: PopulatedTrade;
};

export const TradeConnectionModal = ({ acceptedOffer, trade }: TradeConnectionModalProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useConnectedUserStore((state) => state.user);
  const isTradeOwner = trade.author.id === user?.id;
  const otherUser = isTradeOwner ? acceptedOffer.author : trade.author;
  const currentUserCard = isTradeOwner ? acceptedOffer.wantedCard : acceptedOffer.offeredCard;
  const otherUserCard = isTradeOwner ? acceptedOffer.offeredCard : acceptedOffer.wantedCard;

  const handleCompleteTrade = async () => {
    try {
      setIsLoading(true);
      await updateTradeCompletedStatus(trade.id);
      await queryClient.invalidateQueries({ queryKey: ["user-pending-trades"] });
      setIsOpen(false);

      toast.success("Trade marked as completed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete trade");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">It&apos;s time to connect</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px]">
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-row gap-4 justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <Avatar>
                    <AvatarImage src={`/icons/${otherUser.icon}.png`} />
                    <AvatarFallback>{otherUser.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-base font-bold text-gray-500">{otherUser.username}</span>
                </div>
                <Typography
                  variant="p"
                  text={formatFriendId(otherUser.friend_id)}
                  className="text-gray-500"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg">
                <Typography
                  variant="p"
                  text={`${otherUser.username} is waiting for you to connect in Pokemon TCG Pocket. Add them using their Friend ID shown above.`}
                  className="text-gray-600"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Typography
                  variant="p"
                  text="Trade Details:"
                  className="font-semibold text-gray-700"
                />
                <div className="grid grid-cols-2 gap-4">
                  <TradeConnectionModalCardInfo card={currentUserCard} isOwnCard={true} />
                  <TradeConnectionModalCardInfo card={otherUserCard} isOwnCard={false} />
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg">
                <Typography
                  variant="p"
                  text={`When the trade is completed, mark it as completed by clicking the button below.`}
                  className="text-gray-600"
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="flex flex-row gap-2 justify-center items-center">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="default" type="submit" onClick={() => setIsConfirmAlertOpen(true)}>
              Complete Trade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmAlertModal
        isOpen={isConfirmAlertOpen}
        onClose={() => setIsConfirmAlertOpen(false)}
        onConfirm={handleCompleteTrade}
        title="Complete Trade"
        description="Are you sure you want to complete the trade? This action cannot be undone and the trade will be marked as completed."
        confirmText="Complete Trade"
        confirmVariant="destructive"
      />
    </>
  );
};

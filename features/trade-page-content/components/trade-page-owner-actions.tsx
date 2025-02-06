"use client";

import { deleteTrade } from "@/actions/delete-trade";
import { HoverableTooltip } from "@/components/hoverable-tooltip";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TradePageOwnerActionsProps = {
  authorId: string;
};

export const TradePageOwnerActions = ({ authorId }: TradePageOwnerActionsProps) => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useConnectedUserStore((state) => state.user);
  const isOwner = user?.id === authorId;

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteTrade(id as string);
    setIsDeleting(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      await queryClient.invalidateQueries({ queryKey: ["trades"] });
      router.push("/trades");
    }
  };

  if (!isOwner) return null;

  return (
    <div className="flex w-full flex-row justify-between gap-2 mb-4">
      <Typography variant="h2" text="This is your trade" className="text-gray-500" />
      <div className="flex flex-row gap-2">
        <Button variant="destructive" onClick={handleDelete}>
          {isDeleting && <ButtonLoading>Deleting...</ButtonLoading>}
          {!isDeleting && "Delete"}
        </Button>
      </div>
    </div>
  );
};

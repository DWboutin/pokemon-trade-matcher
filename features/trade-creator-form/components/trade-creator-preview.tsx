import { Typography } from "@/components/typography";
import { TradeCard } from "@/features/trade-card/trade-card";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { CardData } from "@/types/app";
import { formatFriendId } from "@/utils/friendIdFormatters";

type TradeCreatorPreviewProps = {
  searchedCard: CardData | null;
  offeredCards: CardData[];
};

export const TradeCreatorPreview = ({ searchedCard, offeredCards }: TradeCreatorPreviewProps) => {
  const user = useConnectedUserStore((state) => state.user);
  const friendId = user?.friend_id ? formatFriendId(user.friend_id) : "";

  return (
    <div className="w-full ">
      <div className="text-center py-4">
        <Typography variant="h2" text="Preview" />
      </div>
      <TradeCard
        mainCard={searchedCard}
        offeredCards={offeredCards}
        friendId={friendId}
        icon={user?.icon ?? ""}
        username={user?.username ?? ""}
        time="few seconds ago"
      />
    </div>
  );
};

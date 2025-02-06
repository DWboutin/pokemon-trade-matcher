import { Typography } from "@/components/typography";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { CardContent } from "@/components/ui/card";
import { UserProfileInfo } from "@/features/user-profile-info/user-profile-info";
import { CardData } from "@/types/app";
import { timeAgo } from "@/utils/contants";
import { getTradeType } from "@/utils/get-trade-type";
import Image from "next/image";
import { useMemo } from "react";
import { MdCatchingPokemon } from "react-icons/md";

type TradeCardProps = {
  mainCard: CardData | null;
  offeredCards: CardData[];
  username: string;
  icon: string;
  friendId: string;
  time: string;
};

export const TradeCard = ({
  mainCard,
  offeredCards,
  username,
  icon,
  friendId,
  time,
}: TradeCardProps) => {
  const tradeType = useMemo(() => {
    return getTradeType(mainCard, offeredCards);
  }, [mainCard, offeredCards]);

  const descriptionText = useMemo(() => {
    if (tradeType === "want") {
      return `${username} searches for any trade offers to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}.`;
    }

    if (tradeType === "offer") {
      return `${username} offers theses cards below to get any trade offers.`;
    }

    return `${username} offers theses cards below to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}.`;
  }, [mainCard, username, tradeType]);

  return (
    <Card className="shadow-lg border-2 border-gray-50 hover:shadow-2xl transition-shadow duration-300 rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-row max-sm:flex-col max-sm:items-center">
        <div className="py-6 pl-6 max-sm:pb-0">
          {mainCard && (
            <Image
              src={`/cards/${mainCard.cardNumber.replace(/\s/g, "_")}.png`}
              alt={`${mainCard.cardName} ${mainCard.exclusivePack.name} ${mainCard.exclusivePack.series}`}
              width={135}
              height={190}
              className="filter drop-shadow-md"
            />
          )}
          {!mainCard && (
            <div className="w-[135px] h-[190px] bg-gray-200 rounded-md flex flex-col items-center justify-center gap-2">
              <MdCatchingPokemon className="w-20 h-20 text-gray-500" />
              <div className="text-xl font-bold">Any</div>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 w-full max-sm:items-start">
          <CardHeader>
            <CardTitle className="text-xl capitalize">{tradeType}</CardTitle>
            <CardDescription>
              <Typography variant="p" text={descriptionText} />
            </CardDescription>
          </CardHeader>
          {offeredCards.length > 0 && (
            <CardContent className="space-y-2 empty:hidden">
              <div className="flex flex-row gap-2 overflow-x-auto md:h-[85px]">
                {offeredCards.map((card) => (
                  <Image
                    key={card.cardNumber}
                    src={`/cards/${card.cardNumber.replace(/\s/g, "_")}.png`}
                    alt={`${card.cardName} ${card.exclusivePack.name} ${card.exclusivePack.series}`}
                    width={60}
                    height={87}
                    className="filter drop-shadow-md"
                  />
                ))}
              </div>
            </CardContent>
          )}
          <CardFooter className="flex flex-row w-full">
            <div className="flex w-full flex-row gap-2 items-center justify-end">
              <div className="text-sm text-gray-500">{timeAgo.format(new Date(time))}</div>
              <div className="text-sm text-gray-500">-</div>
              <UserProfileInfo username={username} icon={icon} friendId={friendId} />
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

import { Typography } from "@/components/typography";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { CardContent } from "@/components/ui/card";
import { UserProfileInfo } from "@/features/user-profile-info/user-profile-info";
import { CardData } from "@/types/app";
import Image from "next/image";
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
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row">
        <div className="py-6 pl-6">
          {mainCard && (
            <Image
              src={`/cards/${mainCard.cardNumber.replace(/\s/g, "_")}.png`}
              alt={`${mainCard.cardName} ${mainCard.exclusivePack.name} ${mainCard.exclusivePack.series}`}
              width={135}
              height={190}
            />
          )}
          {!mainCard && (
            <div className="w-[135px] h-[190px] bg-gray-200 rounded-md flex flex-col items-center justify-center gap-2">
              <MdCatchingPokemon className="w-20 h-20 text-gray-500" />
              <div className="text-xl font-bold">Any</div>
            </div>
          )}
        </div>
        <div className="flex-1">
          <CardHeader>
            <CardTitle className="text-xl">{mainCard ? "Search" : "Offers"}</CardTitle>
            <CardDescription>
              <Typography
                variant="p"
                text={
                  mainCard
                    ? "The user offers theses cards below to get the card on the left."
                    : "The user offers theses cards below to get any trade offers."
                }
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-row gap-2 overflow-x-auto">
              {offeredCards.map((card) => (
                <Image
                  key={card.cardNumber}
                  src={`/cards/${card.cardNumber.replace(/\s/g, "_")}.png`}
                  alt={`${card.cardName} ${card.exclusivePack.name} ${card.exclusivePack.series}`}
                  width={60}
                  height={87}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-1 flex-row gap-2 items-center justify-end">
              <div className="text-sm text-gray-500">{time}</div>
              <div className="text-sm text-gray-500">-</div>
              <UserProfileInfo username={username} icon={icon} friendId={friendId} />
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

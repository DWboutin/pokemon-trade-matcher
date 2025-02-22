import { Typography } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardData } from "@/types/app";
import Image from "next/image";

export const CardInfoGameDetails = ({ card }: { card: CardData }) => {
  return (
    <Card
      className={cn(
        "shadow-sm relative overflow-hidden border-2 border-gray-50 border-t-white border-l-white hover:shadow-2xl transition-shadow duration-300 rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100",
        "with-diagonal-gradient subtle-gradient"
      )}
    >
      <section className="relative p-6 z-20">
        <Typography variant="h2" text="Game Details" className="!text-xl mb-4" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Typography variant="h3" text="Pack" className="!text-lg text-neutral-600" />
            <div className="flex flex-row gap-4">
              <div className="rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={`/packs/${card.exclusivePack.name.replace(
                    /\s/g,
                    "_"
                  )}-${card.exclusivePack.series.replace(/\s/g, "_")}.png`}
                  alt={card.cardName}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="p" text="Name" className="text-sm text-neutral-500" />
                  <Typography
                    variant="p"
                    text={card.exclusivePack.name}
                    className="font-medium text-neutral-900"
                  />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="p" text="Series" className="text-sm text-neutral-500" />
                  <Typography
                    variant="p"
                    text={card.exclusivePack.series}
                    className="font-medium text-neutral-900"
                  />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="p" text="Points" className="text-sm text-neutral-500" />
                  <Typography
                    variant="p"
                    text={card.packPoints}
                    className="font-medium text-neutral-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography variant="h3" text="How to get" className="!text-lg text-neutral-600" />
            <Typography variant="p" text={card.howToGet} className="text-neutral-900" />
          </div>
        </div>
      </section>
    </Card>
  );
};

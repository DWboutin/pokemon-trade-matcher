import { FaExternalLinkAlt } from "react-icons/fa";
import { Typography } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardData } from "@/types/app";
import Image from "next/image";
import Link from "next/link";

export const CardInfoGameDetails = ({ card }: { card: CardData }) => {
  return (
    <Card
      className={cn(
        "shadow-sm relative overflow-hidden border-2 border-gray-50 border-t-white border-l-white transition-shadow duration-300 rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100",
        "with-diagonal-gradient subtle-gradient"
      )}
    >
      <section className="relative p-6 z-20">
        <div className="flex flex-row gap-4 items-center justify-between mb-4">
          <Typography variant="h2" text="Game Details" className="!text-xl" />
          <Link
            target="_blank"
            href={card.cardDetailsUrl}
            className="flex flex-row items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors duration-300"
          >
            <Typography variant="p" text="View details" className="text-sm" />
            <FaExternalLinkAlt className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Typography variant="h3" text="Pack" className="!text-lg text-neutral-600" />
            <div className="flex flex-row gap-4">
              <div className="rounded-lg overflow-hidden shadow-sm">
                <Link
                  href={`/library?exclusivePackName=${encodeURIComponent(
                    card.exclusivePack.name
                  )}&exclusivePackSeries=${encodeURIComponent(card.exclusivePack.series)}`}
                  className="hover:underline"
                >
                  <Image
                    src={`/packs/${card.exclusivePack.name.replace(
                      /\s/g,
                      "_"
                    )}-${card.exclusivePack.series.replace(/\s/g, "_")}.png`}
                    alt={card.cardName}
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="p" text="Name" className="text-sm text-neutral-500" />
                  <Link
                    href={`/library?exclusivePackName=${encodeURIComponent(
                      card.exclusivePack.name
                    )}`}
                    className="hover:underline"
                  >
                    <Typography
                      variant="p"
                      text={card.exclusivePack.name}
                      className="font-medium text-neutral-900"
                    />
                  </Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="p" text="Series" className="text-sm text-neutral-500" />
                  <Link
                    href={`/library?exclusivePackSeries=${encodeURIComponent(
                      card.exclusivePack.series
                    )}`}
                    className="hover:underline"
                  >
                    <Typography
                      variant="p"
                      text={card.exclusivePack.series}
                      className="font-medium text-neutral-900"
                    />
                  </Link>
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

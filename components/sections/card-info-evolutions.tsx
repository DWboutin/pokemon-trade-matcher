import { Typography } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PopulatedCardData } from "@/types/app";
import { slugifyCard } from "@/utils/slugifyCard";
import Image from "next/image";
import Link from "next/link";

export const CardInfoEvolutions = ({ card }: { card: PopulatedCardData }) => {
  return (
    <Card
      className={cn(
        "shadow-sm relative overflow-hidden border-2 border-gray-50 border-t-white border-l-white transition-shadow duration-300 rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100",
        "with-diagonal-gradient subtle-gradient"
      )}
    >
      <section className="relative rounded-xl p-6 z-20">
        <Typography
          variant="h2"
          text="Evolutions Cards"
          className="!text-xl font-semibold text-neutral-900 mb-6"
        />

        {!card.evolvedFromCards && !card.evolvesToCards && (
          <div className="flex flex-col items-center justify-center py-4">
            <Typography
              variant="p"
              text="This card has no evolutions"
              className="text-neutral-600"
            />
          </div>
        )}

        <div className="flex flex-row justify-between gap-4 max-md:flex-col">
          {card.evolvedFromCards && (
            <div className="flex flex-1 flex-col gap-4">
              <Typography
                variant="h3"
                text={`Evolved from - ${card.evolvedFromCards[0].stage}`}
                className="!text-lg font-semibold text-neutral-900"
              />
              <div className="flex flex-row gap-4 flex-wrap">
                {card.evolvedFromCards.map((evolvedFromCard) => (
                  <Link
                    href={`/library/${slugifyCard(evolvedFromCard)}`}
                    key={evolvedFromCard.cardNumber}
                    className="group"
                    aria-label={`View ${evolvedFromCard.cardName} card details`}
                    role="link"
                  >
                    <Image
                      src={`/cards/${evolvedFromCard.cardNumber.replace(/\s/g, "_")}.png`}
                      alt={`${evolvedFromCard.cardName} ${evolvedFromCard.exclusivePack.name} ${evolvedFromCard.exclusivePack.series}`}
                      width={120}
                      height={160}
                      className="w-auto h-auto shadow-xl rounded-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
          {card.evolvesToCards && (
            <div className="flex flex-1 flex-col gap-4">
              <Typography
                variant="h3"
                text={`Evolves to - ${card.evolvesToCards[0].stage}`}
                className="!text-lg font-semibold text-neutral-900"
              />
              <div className="flex flex-row gap-4 flex-wrap">
                {card.evolvesToCards.map((evolvesToCard) => (
                  <Link
                    href={`/library/${slugifyCard(evolvesToCard)}`}
                    key={evolvesToCard.cardNumber}
                    className="group"
                    aria-label={`View ${evolvesToCard.cardName} card details`}
                    role="link"
                  >
                    <Image
                      src={`/cards/${evolvesToCard.cardNumber.replace(/\s/g, "_")}.png`}
                      alt={`${evolvesToCard.cardName} ${evolvesToCard.exclusivePack.name} ${evolvesToCard.exclusivePack.series}`}
                      width={120}
                      height={160}
                      className="w-auto h-auto shadow-md rounded-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Card>
  );
};

import { Typography } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PopulatedCardData } from "@/types/app";
import { slugifyCard } from "@/utils/slugifyCard";
import Image from "next/image";
import Link from "next/link";

export const CardInfoVariations = ({ card }: { card: PopulatedCardData }) => {
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
          text="Variations Cards"
          className="!text-xl font-semibold text-neutral-900 mb-6"
        />

        {!card.variations && !card.variationsEx && (
          <div className="flex flex-col items-center justify-center py-4">
            <Typography
              variant="p"
              text="This card has no variations"
              className="text-neutral-600"
            />
          </div>
        )}

        <div className="flex flex-row justify-between gap-4 max-md:flex-col">
          {card.variations && (
            <div className="flex flex-1 flex-col gap-4">
              <Typography
                variant="h3"
                text={`Variations of the same card`}
                className="!text-lg font-semibold text-neutral-900"
              />
              <div className="flex flex-row gap-4">
                {card.variations.map((variation) => (
                  <Link
                    href={`/library/${slugifyCard(variation)}`}
                    key={variation.cardNumber}
                    className="group"
                    aria-label={`View ${variation.cardName} card details`}
                    role="link"
                  >
                    <Image
                      src={`/cards/${variation.cardNumber.replace(/\s/g, "_")}.png`}
                      alt={`${variation.cardName} ${variation.exclusivePack.name} ${variation.exclusivePack.series}`}
                      width={120}
                      height={160}
                      className="w-auto h-auto shadow-xl rounded-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
          {card.variationsEx && (
            <div className="flex flex-1 flex-col gap-4">
              <Typography
                variant="h3"
                text={`EX Variations`}
                className="!text-lg font-semibold text-neutral-900"
              />
              <div className="flex flex-row gap-4">
                {card.variationsEx.map((variationEx) => (
                  <Link
                    href={`/library/${slugifyCard(variationEx)}`}
                    key={variationEx.cardNumber}
                    className="group"
                    aria-label={`View ${variationEx.cardName} card details`}
                    role="link"
                  >
                    <Image
                      src={`/cards/${variationEx.cardNumber.replace(/\s/g, "_")}.png`}
                      alt={`${variationEx.cardName} ${variationEx.exclusivePack.name} ${variationEx.exclusivePack.series}`}
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

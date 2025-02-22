import { Typography } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardData, CardEffect } from "@/types/app";
import Image from "next/image";

const CardInfoSkill = ({ skill }: { skill: CardEffect }) => {
  return (
    <div className="flex flex-col items-start gap-3 [&:not(:last-child)]:border-b border-neutral-200 pb-6">
      <div className="flex w-full items-center justify-between">
        <Typography
          variant="h3"
          text={skill.name}
          className="text-neutral-900 font-medium !text-lg"
        />
        <div className="flex flex-row items-center gap-1 rounded-full">
          {skill.cost.map((cost) => {
            return Array.from({ length: cost.count }).map((_, i) => (
              <Image
                key={`${cost.element}-${i}`}
                src={`/types/${cost.element}.png`}
                alt={cost.element}
                width={20}
                height={20}
                className="drop-shadow-sm"
              />
            ));
          })}
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-between gap-4 bg-neutral-200/30 px-4 py-2 rounded-lg">
        <Typography variant="p" text="Damage" className="text-neutral-600 text-sm tracking-wider" />
        <Typography
          variant="p"
          text={skill.damage.toString()}
          className="text-neutral-900 font-medium"
        />
      </div>

      {skill.description && (
        <div className="flex w-full flex-col gap-2 mt-1">
          <Typography
            variant="p"
            text={skill.description}
            className="text-neutral-700 text-sm leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};

export const CardInfoSkills = ({ card }: { card: CardData }) => {
  return (
    <Card
      className={cn(
        "shadow-sm relative overflow-hidden border-2 border-gray-50 border-t-white border-l-white hover:shadow-2xl transition-shadow duration-300 rounded-tl-3xl rounded-br-3xl bg-gradient-to-br from-gray-50 to-gray-100",
        "with-diagonal-gradient subtle-gradient"
      )}
    >
      <section className="relative rounded-xl p-6 z-20">
        <Typography
          variant="h2"
          text="Skills"
          className="!text-xl font-semibold text-neutral-900 mb-6"
        />

        <div className="flex flex-col gap-6">
          {card.effects.map((effect, index) => (
            <CardInfoSkill key={index} skill={effect} />
          ))}
        </div>
      </section>
    </Card>
  );
};

import { HowToTradeCard } from "@/components/sections/how-to-trade/components/how-to-trade-card";
import { Typography } from "@/components/typography";

export const HowToTrade = () => {
  const steps = [
    {
      title: "Start Trading",
      description:
        "Create your own trade listing or browse existing trades and make offers. Choose the option that works best for you!",
    },
    {
      title: "Wait for Offers",
      description:
        "Other players will see your trade and can make offers. You'll receive notifications when someone is interested.",
    },
    {
      title: "Complete the Trade",
      description:
        "Accept an offer you like and connect with the trader in the Pokemon TCG Pocket application to complete the trade.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-4 md:py-8">
      <Typography variant="h3" text="How to Trade on PokeSwap" className="text-center mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <HowToTradeCard
            key={index}
            step={index + 1}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

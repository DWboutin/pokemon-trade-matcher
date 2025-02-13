import { Typography } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";

interface HowToTradeCardProps {
  step: number;
  title: string;
  description: string;
}

export const HowToTradeCard = ({ step, title, description }: HowToTradeCardProps) => {
  return (
    <Card className="bg-white hover:bg-gray-50 transition-colors border-0 with-diagonal-gradient status-rejected overflow-hidden relative shadow-lg">
      <CardContent className="flex flex-col items-center p-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F01616] text-white font-bold mb-4 z-10">
          {step}
        </div>
        <Typography
          variant="h4"
          text={title}
          className="text-sm font-semibold mb-3 text-center text-gray-900 z-10"
        />
        <Typography variant="p" text={description} className="text-gray-600 text-center" />
      </CardContent>
    </Card>
  );
};

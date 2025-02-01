import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-4">
      <Link href="/auth" className="flex flex-row gap-2 items-center">
        <div className="w-10 h-10">
          <TradeMatcherLogo />
        </div>
        <span className="text-2xl font-bold">Trade Matcher</span>
      </Link>
    </div>
  );
}

import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import { Typography } from "@/components/typography";
import SignInForm from "@/features/sign-in-form/sign-in-form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokeSwap.io - Trade Cards & Connect with Players",
  description:
    "PokeSwap.io is the community platform for Pokemon TCG Pocket players to find, connect, and trade cards. Create trade listings, discover rare cards, and build your collection with fellow trainers.",
  keywords:
    "Pokemon TCG Pocket, trading cards, card marketplace, Pokemon card trading, TCG Pocket exchange, rare Pokemon cards",
};

const AuthPage = () => {
  return (
    <main>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex flex-col items-center gap-2 self-center font-medium">
            <div className="flex h-20 w-20 items-center justify-center rounded-md text-primary-foreground">
              <TradeMatcherLogo />
            </div>
            <Typography variant="h1" text="PokeSwap" />
          </Link>
          <SignInForm />
        </div>
      </div>
    </main>
  );
};

export default AuthPage;

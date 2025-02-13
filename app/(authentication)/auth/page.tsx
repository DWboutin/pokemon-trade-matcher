"use client";

import { TradeMatcherLogo } from "@/components/icons/trade-matcher-logo";
import { Typography } from "@/components/typography";
import SignInForm from "@/features/sign-in-form/sign-in-form";
import Link from "next/link";

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

"use client";

import { signInWithOAuth } from "@/actions/sign-in-with-oauth";
import { HoverableTooltip } from "@/components/hoverable-tooltip";
import { Button } from "@/components/ui/button";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";

const isDisabled = !!process.env.NEXT_PUBLIC_VERCEL_URL;

const SignInFormSocialButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <HoverableTooltip content="Coming soon">
        <Button
          variant="outline"
          className="w-full"
          disabled={isDisabled}
          onClick={() => signInWithOAuth({ provider: "facebook" })}
        >
          <FaSquareFacebook size={30} />
          Sign in with Facebook
        </Button>
      </HoverableTooltip>
      <HoverableTooltip content="Coming soon">
        <Button
          variant="outline"
          className="w-full"
          disabled={isDisabled}
          onClick={() => signInWithOAuth({ provider: "google" })}
        >
          <FaGoogle size={30} />
          Sign in with Google
        </Button>
      </HoverableTooltip>
    </div>
  );
};

export default SignInFormSocialButtons;

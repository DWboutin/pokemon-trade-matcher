"use client";

import { signInWithOAuth } from "@/actions/sign-in-with-oauth";
import { Button } from "@/components/ui/button";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";

const SignInFormSocialButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signInWithOAuth({ provider: "facebook" })}
      >
        <FaSquareFacebook size={30} />
        Sign in with Facebook
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signInWithOAuth({ provider: "google" })}
      >
        <FaGoogle size={30} />
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignInFormSocialButtons;

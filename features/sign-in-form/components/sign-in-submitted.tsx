import { MdCatchingPokemon } from "react-icons/md";
import { Typography } from "@/components/typography";

export const SignInSubmitted = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 items-center">
        <MdCatchingPokemon className="w-20 h-20 text-green-500" />
        <Typography variant="h2" text="Sign in successful" />
        <Typography variant="p" text="Check your email for a magic link to sign in." />
      </div>
    </div>
  );
};

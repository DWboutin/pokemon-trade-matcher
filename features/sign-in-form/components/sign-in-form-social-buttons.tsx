import { signInWithFacebook } from "@/actions/sign-in-with-facebook";
import { Button } from "@/components/ui/button";
import { RxGithubLogo } from "react-icons/rx";

const SignInFormSocialButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="w-full" onClick={signInWithFacebook}>
        <RxGithubLogo size={30} />
        Sign in with Github
      </Button>
    </div>
  );
};

export default SignInFormSocialButtons;

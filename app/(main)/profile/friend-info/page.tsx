import { Typography } from "@/components/typography";
import { FriendInfoForm } from "@/features/friend-info-form/friend-info-form";

const FriendInfoPage = () => {
  return (
    <div className="flex flex-col gap-4 py-10 items-center">
      <Typography variant="h1" text="Friend Info" />
      <Typography
        variant="p"
        className="text-muted-foreground"
        text="Setup your profile info to be able to make trades and find friends."
      />
      <FriendInfoForm />
    </div>
  );
};

export default FriendInfoPage;

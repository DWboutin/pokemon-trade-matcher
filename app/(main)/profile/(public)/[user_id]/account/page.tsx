import { getUserData } from "@/actions/get-user-data";
import { Typography } from "@/components/typography";
import { FriendInfoForm } from "@/features/friend-info-form/friend-info-form";
import { getUserById } from "@/utils/requests/get-user-by-id";

const ProfileAccountPage = async ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { user_id } = await params;
  const [connectedUser, user] = await Promise.all([getUserData(), getUserById(user_id)]);

  return (
    <div className="flex flex-col gap-4 py-10 items-center">
      <Typography variant="h1" text="Friend Info" />
      <Typography
        variant="p"
        className="text-muted-foreground"
        text="Setup your profile info to be able to make trades and find friends."
      />
      <div className="max-md:px-4">
        <FriendInfoForm isOwner={connectedUser?.id === user_id} user={user} />
      </div>
    </div>
  );
};

export default ProfileAccountPage;

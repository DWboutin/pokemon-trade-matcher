import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author } from "@/types/app";
import { formatFriendId } from "@/utils/friendIdFormatters";

type ProfileHeaderInfoProps = {
  user: Author;
};

export const ProfileHeaderInfo = ({ user }: ProfileHeaderInfoProps) => {
  return (
    <div className="flex flex-row gap-8 items-center mt-10 max-md:flex-col max-md:gap-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={`/icons/${user?.icon}.png`} />
        <AvatarFallback>{user?.username ? user?.username?.charAt(0) : "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 max-md:items-center">
        <Typography variant="h1" text={`${user?.username ? user?.username : "User"}`} />
        <Typography
          variant="p"
          text={user.friend_id ? formatFriendId(user.friend_id) : "0000-0000-0000-0000"}
          className="text-gray-500"
        />
      </div>
    </div>
  );
};

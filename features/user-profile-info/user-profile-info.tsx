import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type UserProfileInfoProps = {
  username: string;
  icon: string;
  friendId: string;
};

export const UserProfileInfo = ({ username, friendId, icon }: UserProfileInfoProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-row gap-2 items-center">
            <Avatar>
              <AvatarImage src={`/icons/${icon}.png`} />
              <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500">{username}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>{friendId}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

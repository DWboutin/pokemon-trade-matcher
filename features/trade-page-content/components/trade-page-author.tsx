import { HoverableTooltip } from "@/components/hoverable-tooltip";
import { formatTimeAgoDate } from "@/components/time-ago-date";
import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TradeAuthor } from "@/types/app";
import { timeAgo } from "@/utils/contants";
import Link from "next/link";

type TradePageAuthorProps = {
  author: TradeAuthor;
  createdAt: string;
};

export const TradePageAuthor = ({ author, createdAt }: TradePageAuthorProps) => {
  return (
    <div className="flex w-full max-w-[640px] flex-1 justify-between items-center py-2">
      <Link
        href={`/profile/${author.id}/trades`}
        className="flex items-center gap-3 hover:underline hover:text-[#F01616]"
      >
        <Avatar>
          <AvatarImage src={`/icons/${author.icon}.png`} />
          <AvatarFallback>{author.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Typography variant="p" text={author.username} />
      </Link>
      <HoverableTooltip content={new Date(createdAt).toLocaleString()}>
        <Typography variant="p" text={formatTimeAgoDate(createdAt)} />
      </HoverableTooltip>
    </div>
  );
};

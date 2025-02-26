import { FC } from "react";
import { TimeAgoDate } from "@/components/time-ago-date";
import { PendingTradeWithType } from "@/types/app";
import { Typography } from "@/components/typography";
import Link from "next/link";

type HeaderPendingTradesPanelEntryProps = {
  entry: PendingTradeWithType;
};

export const HeaderPendingTradesPanelEntry: FC<HeaderPendingTradesPanelEntryProps> = ({
  entry,
}) => {
  return (
    <Link
      href={`/trades/${entry.id}?action=connect`}
      className="p-3 rounded-lg text-sm cursor-pointer bg-muted"
    >
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex w-full flex-row gap-2 relative">
          {entry.type === "trade" && (
            <Typography
              variant="p"
              text={`${entry.trader.username}, from an offer you accepted, is waiting for you.`}
            />
          )}
          {entry.type === "offer" && (
            <Typography
              variant="p"
              text={`${entry.trader.username}, that accepted your offer, is waiting for you.`}
            />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          <TimeAgoDate date={entry.acceptedAt} />
        </p>
      </div>
    </Link>
  );
};

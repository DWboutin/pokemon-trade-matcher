import { timeAgo } from "@/utils/contants";
import { FC } from "react";

export const formatTimeAgoDate = (date: string) => {
  return timeAgo.format(new Date(date));
};

export const TimeAgoDate: FC<{ date: string }> = ({ date }) => {
  return formatTimeAgoDate(date);
};

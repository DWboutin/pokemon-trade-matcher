import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export const currentOrigin = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_CURRENT_ORIGIN;

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

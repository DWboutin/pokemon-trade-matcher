import { CardType } from "@/types/app";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export const currentOrigin = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_CURRENT_ORIGIN;

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

export const valueToImages: Record<CardType, string> = {
  Colorless: "/types/Colorless.png",
  Darkness: "/types/Darkness.png",
  Dragon: "/types/Dragon.png",
  Fighting: "/types/Fighting.png",
  Fire: "/types/Fire.png",
  Grass: "/types/Grass.png",
  Item: "/types/Item.png",
  Lightning: "/types/Lightning.png",
  Metal: "/types/Metal.png",
  "Pokemon Tool": "/types/Pokemon_Tool.png",
  Psychic: "/types/Psychic.png",
  Supporter: "/types/Supporter.png",
  Water: "/types/Water.png",
};

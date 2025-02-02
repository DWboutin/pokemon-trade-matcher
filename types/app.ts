import { Database } from "@/types/supabase";

export type IconData = {
  name: string;
  imageUrl: string;
};

export type IconsData = {
  icons: IconData[];
};

export type CardData = {
  cardNumber: string;
  cardName: string;
  rarity: string;
  exclusivePack: {
    name: string;
    series: string;
  };
  type: string;
  hp: number;
  stage: string;
  imageUrl: string;
};

export type CardsData = {
  cards: CardData[];
};

export type User = Database["public"]["Tables"]["users"]["Row"];

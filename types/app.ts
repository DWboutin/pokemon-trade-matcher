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
  type: CardType;
  hp: number;
  stage: string;
  imageUrl: string;
};

export type CardsData = {
  cards: CardData[];
};

export type CardType =
  | "Colorless"
  | "Darkness"
  | "Dragon"
  | "Fighting"
  | "Fire"
  | "Grass"
  | "Item"
  | "Lightning"
  | "Metal"
  | "Pokemon Tool"
  | "Psychic"
  | "Supporter"
  | "Water";

export type TradeType = "want" | "offer" | "trade";
export type OfferStatus = "pending" | "accepted" | "rejected";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Trade = Database["public"]["Tables"]["trades"]["Row"];
export type Offer = Database["public"]["Tables"]["offers"]["Row"];
export type Author = {
  [K in keyof Omit<User, "name" | "type" | "email" | "trades">]-?: NonNullable<User[K]>;
};

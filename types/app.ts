import { Database } from "@/types/supabase";

export type IconData = {
  name: string;
  imageUrl: string;
};

export type IconsData = {
  icons: IconData[];
};

export type CardEffect = {
  name: string;
  cost: {
    element: string;
    count: number;
  }[];
  damage: number;
  description: string;
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
  effects: CardEffect[];
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
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type NotificationWithOffer = Notification & {
  offer: Omit<Offer, "author" | "trade_id" | "created_at" | "updated_at" | "status">;
};
export type Author = {
  [K in keyof Omit<User, "name" | "type" | "email" | "trades">]-?: NonNullable<User[K]>;
};
export type TradeAuthor = Omit<
  Author,
  "friend_id" | "created_at" | "email_opt_in" | "last_acceptation"
>;

export enum NotificationType {
  TradeOffer = 0,
  OfferAccepted = 1,
  TradeClosed = 2,
  ProfileReview = 3,
}

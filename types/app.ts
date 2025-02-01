import { Database } from "@/types/supabase";

export type IconData = {
  name: string;
  imageUrl: string;
};

export type IconsData = {
  icons: IconData[];
};

export type User = Database["public"]["Tables"]["users"]["Row"];

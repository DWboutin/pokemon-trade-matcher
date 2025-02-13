import { getUserData } from "@/actions/get-user-data";
import { User } from "@/types/app";
import { createClient } from "@/utils/supabase/client";
import { create } from "zustand";

type ConnectedUserStore = {
  user: User | null;
  isLoading: boolean;
  fetchUserData: () => Promise<User | null>;
  handleSignOut: () => Promise<void>;
};

export const useConnectedUserStore = create<ConnectedUserStore>((set) => ({
  user: null,
  isLoading: false,
  fetchUserData: async () => {
    set({ isLoading: true });
    const user = await getUserData();
    set({ user, isLoading: false });
    return user;
  },
  handleSignOut: async () => {
    const supabaseBrowserClient = createClient();
    await supabaseBrowserClient.auth.signOut();
    set({ user: null, isLoading: false });
    window.location.href = "/";
  },
}));

import { useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { getUserData } from "@/actions/get-user-data";

type UseConnectedUserSelectors = {
  user: SupabaseUser | null;
  isLoading: boolean;
};

type UseConnectedUserActions = {
  handleSignOut: () => Promise<void>;
};

type UseConnectedUserHook = {
  selectors: UseConnectedUserSelectors;
  actions: UseConnectedUserActions;
};

export const useConnectedUser = (): UseConnectedUserHook => {
  const supabaseBrowserClient = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  const fetchUserData = async () => {
    setIsLoading(true);
    const user = await getUserData();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    await supabaseBrowserClient.auth.signOut();
    setUser(null);
  };

  return { selectors: { user, isLoading }, actions: { handleSignOut } };
};

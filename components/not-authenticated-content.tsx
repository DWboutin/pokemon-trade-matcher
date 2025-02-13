"use client";

import { useConnectedUserStore } from "@/stores/connected-user-store";

export const NotAuthenticatedContent = ({ children }: { children: React.ReactNode }) => {
  const user = useConnectedUserStore((state) => state.user);

  if (user) {
    return null;
  }

  return children;
};

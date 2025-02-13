import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { friendInfoFormSchema } from "@/features/friend-info-form/utils/friend-info-form-schema";
import { updateUserFriendInfo } from "@/actions/update-user-friend-info";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { formatFriendId } from "@/utils/friendIdFormatters";
import { toast } from "sonner";
import { Author } from "@/types/app";

type UseFriendInfoFormSelectors = {
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof friendInfoFormSchema>>;
  selectedIcon: string;
};

type UseFriendInfoFormActions = {
  handleFormSubmit: (values: z.infer<typeof friendInfoFormSchema>) => Promise<void>;
};

type UseFriendInfoForm = {
  selectors: UseFriendInfoFormSelectors;
  actions: UseFriendInfoFormActions;
};

export const useFriendInfoForm = ({
  defaultValues,
}: {
  defaultValues: Author | null;
}): UseFriendInfoForm => {
  const [isPending, setIsPending] = useState(false);
  const isLoading = useConnectedUserStore((state) => state.isLoading);
  const fetchUserData = useConnectedUserStore((state) => state.fetchUserData);
  const form = useForm<z.infer<typeof friendInfoFormSchema>>({
    resolver: zodResolver(friendInfoFormSchema),
    defaultValues: {
      friendId: defaultValues?.friend_id ?? "",
      username: defaultValues?.username ?? "",
      icon: defaultValues?.icon ?? "",
    },
  });
  const selectedIcon = form.watch("icon");

  const handleFormSubmit = async (values: z.infer<typeof friendInfoFormSchema>) => {
    setIsPending(true);

    const response = await updateUserFriendInfo(values.friendId, values.username, values.icon);

    setIsPending(false);

    if (response === null || "error" in response) {
      toast.error(response?.error ?? "An error occurred while updating your profile.");
      return;
    }

    await fetchUserData();

    toast.success("Your profile has been updated.");
  };

  return {
    selectors: { isPending: isPending || isLoading, form, selectedIcon },
    actions: { handleFormSubmit },
  };
};

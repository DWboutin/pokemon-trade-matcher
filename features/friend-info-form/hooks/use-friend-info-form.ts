import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { friendInfoFormSchema } from "@/features/friend-info-form/utils/friend-info-form-schema";
import { updateUserFriendInfo } from "@/actions/update-user-friend-info";
import { useConnectedUser } from "@/hooks/use-connected-user";

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

export const useFriendInfoForm = (): UseFriendInfoForm => {
  const [isPending, setIsPending] = useState(false);
  const {
    selectors: { user },
  } = useConnectedUser();
  const form = useForm<z.infer<typeof friendInfoFormSchema>>({
    resolver: zodResolver(friendInfoFormSchema),
    defaultValues: {
      friendId: user?.friend_id ?? "",
      username: user?.username ?? "",
      icon: user?.icon ?? "",
    },
  });
  const selectedIcon = form.watch("icon");

  const handleFormSubmit = async (values: z.infer<typeof friendInfoFormSchema>) => {
    setIsPending(true);

    const response = await updateUserFriendInfo(values.friendId, values.username, values.icon);

    setIsPending(false);

    if (response === null) {
      return;
    }

    console.log({ response });
  };

  useEffect(() => {
    if (user) {
      form.setValue("friendId", user.friend_id);
      form.setValue("username", user.username);
      form.setValue("icon", user.icon);
    }
  }, [user]);

  return { selectors: { isPending, form, selectedIcon }, actions: { handleFormSubmit } };
};

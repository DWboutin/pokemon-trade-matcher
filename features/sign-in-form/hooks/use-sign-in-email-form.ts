import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerWithEmail } from "@/actions/register-with-email";
import { signInFormSchema } from "@/features/sign-in-form/utils/sign-in-form-schema";

type UseSignInEmailFormSelectors = {
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof signInFormSchema>>;
};

type UseSignInEmailFormActions = {
  handleFormSubmit: (values: z.infer<typeof signInFormSchema>) => Promise<void>;
};

type UseSignInEmailForm = {
  selectors: UseSignInEmailFormSelectors;
  actions: UseSignInEmailFormActions;
};

const useSignInEmailForm = (): UseSignInEmailForm => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setIsPending(true);

    const response = await registerWithEmail(values.email);

    setIsPending(false);

    const { data, error } = JSON.parse(response);

    console.log({ data, error });

    if (error) {
      console.error(error);
    }

    return data;
  };

  return { selectors: { isPending, form }, actions: { handleFormSubmit } };
};

export default useSignInEmailForm;

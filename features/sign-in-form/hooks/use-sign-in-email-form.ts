import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerWithEmail } from "@/actions/register-with-email";
import { signInFormSchema } from "@/features/sign-in-form/utils/sign-in-form-schema";
import { toast } from "sonner";

type UseSignInEmailFormSelectors = {
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof signInFormSchema>>;
  signInSubmitted: boolean;
  error: string | null;
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
  const [signInSubmitted, setSignInSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

    if (error) {
      console.error(error);
      toast.error("An error occurred while signing in.");
      setError(error);
      return;
    }

    toast.success("Signed in successfully. Look for an email with a magic link to continue.");
    setSignInSubmitted(true);
    return data;
  };

  return {
    selectors: { isPending, form, signInSubmitted, error },
    actions: { handleFormSubmit },
  };
};

export default useSignInEmailForm;

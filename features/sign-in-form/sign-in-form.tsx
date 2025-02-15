"use client";

import { FC, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignInFormSocialButtons from "@/features/sign-in-form/components/sign-in-form-social-buttons";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSignInEmailForm from "@/features/sign-in-form/hooks/use-sign-in-email-form";
import { SignInFormCard } from "@/features/sign-in-form/components/sign-in-form-card";
import { SignInSubmitted } from "@/features/sign-in-form/components/sign-in-submitted";
import { Typography } from "@/components/typography";
import Link from "next/link";

const SignInForm: FC = () => {
  const {
    selectors: { isPending, form, signInSubmitted, error },
    actions: { handleFormSubmit },
  } = useSignInEmailForm();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <SignInFormCard>
        {!signInSubmitted && (
          <div className="grid gap-6">
            <SignInFormSocialButtons />
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <fieldset disabled={isPending}>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="m@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {error && (
                      <Typography
                        variant="p"
                        text="An error occurred while signing in. Please try again later."
                        className="text-red-500"
                      />
                    )}
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </fieldset>
              </form>
            </Form>
          </div>
        )}
        {signInSubmitted && <SignInSubmitted />}
      </SignInFormCard>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By signing in, you agree to our <Link href="/legal/terms-of-service">Terms of Service</Link>{" "}
        and <Link href="/legal/privacy-policy">Privacy Policy</Link> and you opt in for email
        notifications and marketing emails. You can opt out at any time in your profile settings.
      </div>
    </div>
  );
};

export default SignInForm;

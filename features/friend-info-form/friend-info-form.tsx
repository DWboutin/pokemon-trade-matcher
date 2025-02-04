"use client";

import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFriendInfoForm } from "@/features/friend-info-form/hooks/use-friend-info-form";
import { PlayerIconDropdown } from "@/features/player-icon-dropdown/player-icon-dropdown";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

export const FriendInfoForm = () => {
  const {
    selectors: { form, isPending, selectedIcon },
    actions: { handleFormSubmit },
  } = useFriendInfoForm();

  const searchParams = useSearchParams();
  const redirected = searchParams.get("redirected");

  useEffect(() => {
    if (redirected) {
      toast.warning("You need to fill in your friend info to continue.");
    }
  }, [redirected]);

  return (
    <div className={cn("flex flex-col gap-6 mt-4", "className")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Pokemon TCGP infos</CardTitle>
          <CardDescription>
            Fill the info below with the same info as your Pokemon TCGP game.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <fieldset disabled={isPending}>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="friendId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Friend Id</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0123-4567-8901-2345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Ash Ketchum" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <div className="flex flex-row justify-between">
                        <FormItem className="flex flex-col gap-1 mt-2">
                          <FormLabel>Player icon</FormLabel>
                          <FormControl>
                            <PlayerIconDropdown {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={`/icons/${selectedIcon}.png`} />
                          <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    {isPending && (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        Updating...
                      </>
                    )}
                    {!isPending && "Update"}
                  </Button>
                </div>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

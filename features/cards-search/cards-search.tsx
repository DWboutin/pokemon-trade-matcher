"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardsRarityDropdown } from "@/features/cards-search/components/cards-rarity-dropdown";
import { useCardsSearch } from "@/features/cards-search/hooks/use-cards-search";

export const CardsSearch = () => {
  const {
    selectors: { form },
  } = useCardsSearch();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log("submit", { values });
        })}
      >
        <fieldset disabled={false}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Bulbasaur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardsRarityDropdown />
            <Button type="submit" className="w-full">
              Search
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

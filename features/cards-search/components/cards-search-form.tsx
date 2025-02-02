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
import { CardsPackNameDropdown } from "@/features/cards-search/components/cards-pack-name-dropdown";
import { CardsPackSerieDropdown } from "@/features/cards-search/components/cards-pack-serie-dropdown";
import { CardsRarityDropdown } from "@/features/cards-search/components/cards-rarity-dropdown";
import { CardsStageDropdown } from "@/features/cards-search/components/cards-stage-dropdown";
import { CardsTypeDropdown } from "@/features/cards-search/components/cards-type-dropdown";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type CardsSearchFormProps = {
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
  handleSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void>;
  isLoading: boolean;
};

export const CardsSearchForm: FC<CardsSearchFormProps> = ({ form, handleSubmit, isLoading }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={isLoading}>
          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 gap-4 mb-6">
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
            <FormField
              control={form.control}
              name="rarity"
              render={({ field }) => (
                <div className="flex flex-1 flex-row justify-between">
                  <FormItem className="flex flex-1 flex-col gap-1 mt-2">
                    <FormLabel>Rarity</FormLabel>
                    <FormControl>
                      <CardsRarityDropdown {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="exclusivePackName"
              render={({ field }) => (
                <div className="flex flex-1 flex-row justify-between">
                  <FormItem className="flex flex-1 flex-col gap-1 mt-2">
                    <FormLabel>Pack Name</FormLabel>
                    <FormControl>
                      <div className="min-w-64">
                        <CardsPackNameDropdown {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="exclusivePackSeries"
              render={({ field }) => (
                <div className="flex flex-1 flex-row justify-between">
                  <FormItem className="flex flex-1 flex-col gap-1 mt-2">
                    <FormLabel>Pack Serie</FormLabel>
                    <FormControl>
                      <div className="min-w-52">
                        <CardsPackSerieDropdown {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <div className="flex flex-1 flex-row justify-between">
                  <FormItem className="flex flex-1 flex-col gap-1 mt-2">
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <div className="min-w-48">
                        <CardsTypeDropdown {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="hp"
              render={({ field }) => (
                <div className="flex flex-1 flex-row justify-between">
                  <FormItem className="flex flex-1 flex-col gap-1 mt-2">
                    <FormLabel>HP</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <div className="flex flex-1 flex-row justify-between">
                  <FormItem className="flex flex-1 flex-col gap-1 mt-2">
                    <FormLabel>Stage</FormLabel>
                    <FormControl>
                      <CardsStageDropdown {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Searching...
              </>
            )}
            {!isLoading && "Search"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

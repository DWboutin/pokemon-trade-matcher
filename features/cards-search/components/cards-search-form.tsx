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
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { FC, useState } from "react";
import { AiFillFilter, AiOutlineLoading3Quarters } from "react-icons/ai";
import dynamic from "next/dynamic";

const CardsSearchModal = dynamic(
  () =>
    import("@/features/cards-search/components/cards-search-modal").then(
      (mod) => mod.CardsSearchModal
    ),
  { ssr: false }
);

type CardsSearchFormProps = {
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
  handleSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void>;
  isLoading: boolean;
  isDisabled: boolean;
};

export const CardsSearchForm: FC<CardsSearchFormProps> = ({
  form,
  handleSubmit,
  isLoading,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    form.handleSubmit(handleSubmit)();
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={isLoading}>
          <div className="flex flex-1 flex-row gap-4 mb-6 items-end w-full">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Bulbasaur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="secondary" type="button" onClick={() => setIsOpen(true)}>
              <AiFillFilter />
              <span className="sr-only">Refine my search</span>
            </Button>
            <CardsSearchModal
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              form={form}
              handleApply={handleApply}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || isDisabled}>
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

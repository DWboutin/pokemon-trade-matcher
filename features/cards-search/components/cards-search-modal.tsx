import Image from "next/image";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CardData } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { FormField } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { CardsStageDropdown } from "@/features/cards-search/components/cards-stage-dropdown";
import { Input } from "@/components/ui/input";
import { CardsTypeDropdown } from "@/features/cards-search/components/cards-type-dropdown";
import { CardsPackSerieDropdown } from "@/features/cards-search/components/cards-pack-serie-dropdown";
import { CardsPackNameDropdown } from "@/features/cards-search/components/cards-pack-name-dropdown";
import { CardsRarityDropdown } from "@/features/cards-search/components/cards-rarity-dropdown";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type CardsSearchModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
  handleApply: () => void;
};

export const CardsSearchModal = ({
  isOpen,
  onOpenChange,
  form,
  handleApply,
}: CardsSearchModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refine my search</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
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
        <DialogFooter className="flex flex-row gap-2 justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="default" type="submit" onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

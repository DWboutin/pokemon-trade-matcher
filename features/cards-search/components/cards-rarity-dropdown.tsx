"use client";

import { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardData, CardsData } from "@/types/app";

const cardsData: CardsData = cardsDataJson;
const raritiesData = cardsData.cards.reduce<string[]>((acc, card) => {
  if (!acc.find((rarity) => rarity === card.rarity)) {
    acc.push(card.rarity);
  }
  return acc;
}, []);

export const CardsRarityDropdown: React.FC = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);
  const selectedValue = useMemo(() => {
    const foundRarity = raritiesData.find((rarity) => rarity === value);

    return foundRarity;
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between gap-4"
        >
          <div className="flex items-center gap-2 capitalize">
            {value ? selectedValue : "Select your rarity..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {raritiesData.map((rarity) => (
                <CommandItem
                  key={rarity}
                  value={rarity}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <span>{rarity}</span>
                  <Check
                    className={cn("ml-auto", value === rarity ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

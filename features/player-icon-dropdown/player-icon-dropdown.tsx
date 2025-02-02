"use client";

import { useState } from "react";
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

import iconsDataJson from "@/scripts/data/icons-data.json";
import { IconsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";

const iconsData: IconsData = iconsDataJson;

export const PlayerIconDropdown: React.FC<ControllerRenderProps<{ icon: string }>> = ({
  onChange,
  value,
}) => {
  const [open, setOpen] = useState(false);

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
            {value ? value : "Select your icon..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search icon..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {iconsData.icons.map((icon) => (
                <CommandItem
                  key={icon.name}
                  value={icon.name}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Image src={icon.imageUrl} alt={icon.name} width={32} height={32} />
                  <span className="capitalize">{icon.name}</span>
                  <Check
                    className={cn("ml-auto", value === icon.name ? "opacity-100" : "opacity-0")}
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

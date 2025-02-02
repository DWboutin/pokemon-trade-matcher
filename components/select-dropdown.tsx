"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";

type SelectDropdownProps = {
  valueRenderer?: (value: string) => React.ReactNode;
  options: string[];
  placeholder: string;
} & ControllerRenderProps<Record<string, string | undefined>>;

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  onChange,
  value,
  options,
  placeholder,
  valueRenderer,
}) => {
  const [open, setOpen] = useState(false);
  const displayedValue = useMemo(() => {
    if (!value) {
      return placeholder;
    }

    if (valueRenderer) {
      return valueRenderer(value);
    }

    return value;
  }, [value, valueRenderer, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between gap-4"
        >
          <div className="flex items-center gap-2 capitalize">{displayedValue}</div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {valueRenderer ? valueRenderer(option) : option}
                  <Check
                    className={cn("ml-auto", value === option ? "opacity-100" : "opacity-0")}
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

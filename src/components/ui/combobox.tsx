"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ComboBox({ framework, value, setValue, id }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(false);

  function searchLabel(value: any) {
    const data = framework.filter((item: any) => item.value === value);
    console.log(data[0].label);
    return data[0].label;
  }

  return (
    <Accordion type="single" collapsible id={id}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm">
          {value
            ? framework.find(
                (framework: any) => framework.value === value.value,
              )?.label
            : "Pilih Kategori"}
        </AccordionTrigger>
        <AccordionContent>
          <Command>
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {framework.map((framework: any) => (
                  <CommandItem
                    key={framework.value + framework.index}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      console.log(value);
                      setValue({
                        value: currentValue === value ? "" : framework.value,
                        label: searchLabel(framework.value),
                      });
                      setOpen(false);
                    }}
                    className="flex gap-4"
                  >
                    <p>{framework.label}</p>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

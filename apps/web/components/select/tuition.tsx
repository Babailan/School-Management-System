"use client";

import {
  Calculator,
  Calendar,
  ChevronUp,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { getAllTuitionFee } from "@/actions/tuition/get-tuition";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

export type SelectTuitionProps = {
  onAmount?: (amount: number) => void;
};

export default function SelectTuition({ onAmount }: SelectTuitionProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { data } = useQuery({
    queryKey: ["tuition-list"],
    queryFn: async () => await getAllTuitionFee(),
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-56 justify-normal">
          {value ? value?.toUpperCase() : "Select Tuition"}
          <ChevronUp className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command onSelect={(e) => console.log(e)}>
          <CommandInput placeholder="Search for tuition" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Avaiable Tuition">
              {data?.map((tuition) => (
                <CommandItem
                  key={tuition._id}
                  className="uppercase"
                  onSelect={(v) => {
                    setValue(v);
                    if (onAmount) {
                      onAmount(tuition.amount);
                    }
                  }}
                >
                  {tuition.tuition_title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

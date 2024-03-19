"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
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
import { useMutation } from "@tanstack/react-query";
import { getTuitionSearchAction } from "@/actions/tuition/get-tuition";

export default function SelectTuition() {
  return (
    <Command
      onChange={(te) => {
        console.log(te);
      }}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        <CommandGroup heading="Avaiable Tuition">
          <CommandItem>Dashboard</CommandItem>
          <CommandItem>Students</CommandItem>
          <CommandItem>Classes</CommandItem>
          <CommandItem>Payments</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

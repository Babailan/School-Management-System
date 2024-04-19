"use client";

import { getSubjectSearchAction } from "@/actions/subject/get-subject";
import { getTuitionSearchAction } from "@/actions/tuition/get-tuition";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { Book } from "lucide-react";
import React from "react";

// make props
type DialogTuitionProps = {
  children: React.ReactNode;
  onTuitionSelected?: (subject: any) => void;
};

export function DialogTuition({
  children,
  onTuitionSelected,
}: DialogTuitionProps) {
  const [open, setOpen] = React.useState(false);

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["tuition-list"],
    queryFn: async () => await getTuitionSearchAction("", 0, 0),
  });

  return (
    <>
      <div onClick={() => setOpen(!open)}>{children}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {isPending && <CommandItem>Loading...</CommandItem>}
            {data?.results.map((tuition, idx) => (
              <span
                key={idx}
                onClick={() => {
                  setOpen(false);
                  if (onTuitionSelected) onTuitionSelected(tuition);
                }}
              >
                <CommandItem>
                  <Book size={16} />
                  <span className="ml-2 uppercase">{tuition.tuition_title}</span>
                </CommandItem>
              </span>
            ))}
            {isSuccess && data?.results.length === 0 && (
              <CommandItem>No results found.</CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

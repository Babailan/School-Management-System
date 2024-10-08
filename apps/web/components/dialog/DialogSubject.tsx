"use client";

import { getSubjectSearchAction } from "@/actions/subject/get-subject";
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
type DialogSubjectProps = {
  children?: React.ReactNode;
  onSubjectSelected?: (subject: any) => void;
};

export function DialogSubject({
  children,
  onSubjectSelected,
}: DialogSubjectProps) {
  const [open, setOpen] = React.useState(false);

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["subjects-list"],
    queryFn: async () => await getSubjectSearchAction(1, "", 0),
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
            {data?.results.map((subject, idx) => (
              <span
                key={idx}
                onClick={() => {
                  setOpen(false);
                  if (onSubjectSelected) onSubjectSelected(subject);
                }}
              >
                <CommandItem>
                  <Book size={16} />
                  <span className="ml-2 uppercase">{subject.subjectName}</span>
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

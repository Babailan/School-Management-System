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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  const { data } = useQuery({
    queryKey: ["subjects-list"],
    queryFn: async () => await getSubjectSearchAction(1, "", 0),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-1">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data?.results.map((subject) => (
                <DialogTrigger
                  key={subject._id}
                  className="block w-full"
                  onClick={() => {
                    if (onSubjectSelected) onSubjectSelected(subject);
                  }}
                >
                  <CommandItem className="uppercase">
                    <Book className="size-4 mr-2" />
                    {subject.subjectName}
                  </CommandItem>
                </DialogTrigger>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

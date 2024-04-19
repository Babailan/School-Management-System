"use client";

import { getSectionSearchAction } from "@/actions/section/get-section";
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
import { Book, LampDesk } from "lucide-react";
import numeral from "numeral";
import React from "react";
import { SelectYear } from "../select";

// make props
type DialogSectionProps = {
  children?: React.ReactNode;
  onSectionSelected?: (subject: any) => void;
};

export function DialogSection({
  children,
  onSectionSelected,
}: DialogSectionProps) {
  const [school_year,setSchoolYear] = React.useState(new Date().getFullYear().toString())
  const [open, setOpen] = React.useState(false);

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["section-list",school_year],
    queryFn: async () =>
      await getSectionSearchAction("", 0, 0, { school_year }),
  });

  return (
    <>
      <div onClick={() => setOpen(!open)}>{children}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <SelectYear onValueChange={(year)=>setSchoolYear(year)} value={school_year}/>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {isPending && <CommandItem>Loading...</CommandItem>}
            {data?.results.map((section, idx) => (
              <span
                key={idx}
                onClick={() => {
                  setOpen(false);
                  if (onSectionSelected) onSectionSelected(section);
                }}
              >
                <CommandItem>
                  <div>
                    <LampDesk size={16} />
                  </div>
                  <div className="ml-2">
                    <span className="uppercase">{section.section_name}</span>
                    <span className="w-full block">
                      {numeral(section.semester).format("0o")} Semester
                    </span>
                  </div>
                </CommandItem>
              </span>
            ))}
          
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

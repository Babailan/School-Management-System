"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListFilter } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "next/navigation";

export default function FilterStudentFee() {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-2">
      <div>
        <Input placeholder="Search for account" />
      </div>
      <div >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2 h-7 text-xs" size="sm">
              <ListFilter size={12} />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort Balance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={searchParams.get("paid") == null}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Paid</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Not Paid</DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

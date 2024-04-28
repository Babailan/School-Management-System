"use client";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function FilterAccessControl() {
  const searchParams = useSearchParams();
  const rolesClicked = (value: string | null, unset: boolean = false) => {
    return () => {
      const params = new URLSearchParams(searchParams.toString());
      if (unset) {
        params.delete("roles");
      }
      if (typeof value == "string") {
        params.set("roles", value);
      }
      window.history.pushState(null, "", `?${params.toString()}`);
    };
  };

  return (
    <div className="space-y-2">
      <Input placeholder="Search for account" />
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="h-7 gap-2">
              <ListFilter size={14} />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Roles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                checked={searchParams.get("roles") == null}
                onClick={rolesClicked(null, true)}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={searchParams.get("roles") == "faculty"}
                onClick={rolesClicked("faculty")}
              >
                Faculty
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={rolesClicked("cashier")}>
                Cashier
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={rolesClicked("registrar")}>
                Registrar
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Limit</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

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

  const handleSearch = (e) => {
    if (e.code === "Enter") {
      const queryParams = new URLSearchParams();
      queryParams.set("search", e.target.value.trim());
      window.history.pushState(null, "", "?" + queryParams.toString());
    }
  };

  return (
    <Input
      placeholder="Search for account"
      defaultValue={searchParams.get("search") || ""}
      onKeyUp={handleSearch}
    />
  );
}

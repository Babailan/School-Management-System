"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

export default function VerificationSearch() {
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
      placeholder="Search for students / reference number"
      // value={searchValue}
      defaultValue={searchParams.get("search") || ""}
      onKeyUp={handleSearch}
    />
  );
}

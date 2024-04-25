"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function VerificationSearch() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.code === "Enter") {
      const queryParams = new URLSearchParams();
      queryParams.set("search", searchValue.trim());
      const queryString = queryParams.toString();
      const newUrl = `/verification${queryString ? `?${queryString}` : ""}`;
      router.replace(newUrl)
    }
  };

  return (
    <Input
      placeholder="Search for students / reference number"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyUp={handleSearch}
    />
  );
}

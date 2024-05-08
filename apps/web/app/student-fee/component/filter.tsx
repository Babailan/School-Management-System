"use client";

import { Input } from "@/components/ui/input";

import { useSearchParams } from "next/navigation";

export default function FilterStudentFee() {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-2">
      <Input placeholder="Search for account" />
    </div>
  );
}

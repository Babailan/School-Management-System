"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SidebarOption({ option }) {
  const pathname = usePathname();

  return option.map((option, idx) => {
    const match = pathToRegexp(option.href + "/:path*").test(pathname);

    return (
      <Link
        href={option.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
          match ? "bg-muted text-primary" : "text-muted-foreground"
        )}
        key={idx}
      >
        {option.icon}
        <span>{option.title}</span>
      </Link>
    );
  });
}

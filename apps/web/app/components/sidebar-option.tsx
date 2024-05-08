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
          "flex items-center justify-between gap-3 rounded-lg px-3 py-2  transition-all",
          match ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
        )}
        key={idx}
      >
        
        <span className="flex items-center justify-center gap-2 h-full">{option.icon} {option.title}</span>
        <span>{option?.modals}</span>
      </Link>
    );
  });
}

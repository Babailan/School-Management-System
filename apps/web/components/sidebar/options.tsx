"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";

export default function SidebarOption({ option }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col px-4">
      {option.map((option, idx) => {
        const match = pathToRegexp(option.href + "/:path*").test(pathname);

        return (
          <TooltipProvider key={idx}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={option.href}>
                  <Button
                    variant={match ? "default" : "ghost"}
                    className="size-fit lg:w-full justify-start gap-2"
                  >
                    {option.icon}
                    <span className="hidden lg:inline">{option.title}</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{option.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}

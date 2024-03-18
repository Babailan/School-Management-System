"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

const CustomLink = ({ href, children }) => {
  const pathname = usePathname();

  const match = pathToRegexp(href + "/:path*").test(pathname);
  return (
    <Link href={href}>
      <Button
        variant={match ? "default" : "ghost"}
        className="w-full my-1 justify-start"
      >
        {children}
      </Button>
    </Link>
  );
};
export default function ({ option }) {
  return (
    <div className="flex flex-col px-4">
      {option.map((option, idx) => {
        return (
          <CustomLink href={option.href} key={idx}>
            {option.icon}
            {option.title}
          </CustomLink>
        );
      })}
    </div>
  );
}

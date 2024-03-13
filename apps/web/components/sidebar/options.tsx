"use client";

import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathToRegexp } from "path-to-regexp";

const CustomLink = ({ href, label }) => {
  const pathname = usePathname();

  const match = pathToRegexp(href + "/:path*").test(pathname);
  return (
    <Link href={href}>
      <button
        className={`text-black text-sm px-4 py-2 w-full text-left hover:bg-blue-200 rounded-full ${
          match ? "bg-blue-200" : ""
        }`}
      >
        {label}
      </button>
    </Link>
  );
};
export default function ({ option, header }) {
  return (
    <Flex direction="column" gap="2">
      <Text size="2" weight="bold" className="px-4 py-2">
        {header}
      </Text>
      <Flex direction="column" gap="1">
        {option.map((option, idx) => {
          return (
            <CustomLink href={option.href} label={option.title} key={idx} />
          );
        })}
      </Flex>
    </Flex>
  );
}

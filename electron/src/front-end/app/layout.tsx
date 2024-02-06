"use client";

import { useLocalStorage } from "usehooks-ts";
import "@radix-ui/themes/styles.css";
import "./global.css";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Flex, ScrollArea, Theme } from "@radix-ui/themes";
import Sidebar from "../components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userToken] = useLocalStorage("userToken", "");
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (userToken == "") {
      router.push("/login");
    }
  }, [userToken]);
  return (
    <html lang="en">
      <body>
        <Box className="overflow-hidden">
          <Theme>
            <Flex>
              <Box width={"max-content"}>
                {pathname == "/login" || <Sidebar />}
              </Box>
              <ScrollArea className="max-h-screen">
                <Box p={pathname == "/login" ? "0" : "9"} className="h-screen">
                  {children}
                </Box>
              </ScrollArea>
            </Flex>
          </Theme>
        </Box>
      </body>
    </html>
  );
}

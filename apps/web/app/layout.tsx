import "@radix-ui/themes/styles.css";
import "./global.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Box, Flex, ScrollArea, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactClientProvider from "./react-query-provider";
import dynamic from "next/dynamic";
import AuthenticatorComponent from "./authToken";

const DynamicSideBar = dynamic(() => import("../components/sidebar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthenticatorComponent>
          <ReactClientProvider>
            <ReactQueryDevtools initialIsOpen={true} />
            <Toaster position="top-right" reverseOrder={false} />
            <Box>
              <Theme>
                <Flex>
                  <DynamicSideBar />
                  <ScrollArea>
                    <Box className="max-h-screen">{children}</Box>
                  </ScrollArea>
                </Flex>
              </Theme>
            </Box>
          </ReactClientProvider>
        </AuthenticatorComponent>
      </body>
    </html>
  );
}

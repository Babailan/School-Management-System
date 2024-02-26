import "@radix-ui/themes/styles.css";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "handsontable/dist/handsontable.full.min.css";
import { Box, Flex, ScrollArea, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactClientProvider from "./react-query-provider";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

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
        <ReactClientProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <ToastContainer />
          <Toaster position="top-right" reverseOrder={false} />
          <Box>
            <Theme>
              <Flex>
                <DynamicSideBar />
                <ScrollArea>
                  <Box className="max-h-screen min-h-screen">{children}</Box>
                </ScrollArea>
              </Flex>
            </Theme>
          </Box>
        </ReactClientProvider>
      </body>
    </html>
  );
}

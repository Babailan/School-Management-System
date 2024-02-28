import "@radix-ui/themes/styles.css";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "handsontable/dist/handsontable.full.min.css";
import { Box, Flex, ScrollArea, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactClientProvider from "./react-query-provider";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body>
        <ReactClientProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <ToastContainer />
          <Toaster position="top-right" reverseOrder={false} />
          <Box>
            <Theme>
              <Flex>
                <Sidebar />
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

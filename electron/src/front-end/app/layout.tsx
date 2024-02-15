import "@radix-ui/themes/styles.css";
import "./global.css";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import { Box, Flex, ScrollArea, Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserRedirection from "./user-redirect";
import ReactClientProvider from "./react-query-provider";
import Sidebar from "../components/sidebar";

registerAllModules();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserRedirection>
          <ReactClientProvider>
            <ReactQueryDevtools initialIsOpen={true} />
            <Toaster position="top-right" reverseOrder={false} />
            <Box>
              <Theme>
                <Flex>
                  <Sidebar />
                  <ScrollArea>
                    <Box className="max-h-screen">{children}</Box>
                  </ScrollArea>
                </Flex>
              </Theme>
            </Box>
          </ReactClientProvider>
        </UserRedirection>
      </body>
    </html>
  );
}

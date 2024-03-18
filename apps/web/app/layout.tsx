import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "handsontable/dist/handsontable.full.min.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactClientProvider from "./react-query-provider";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/sidebar";
import { Metadata } from "next";
import { Toaster as BetterToast } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getAuth } from "@/middleware";
import { isElectron } from "@/lib/helpers/isElectron";
import MenuBar from "./menubar";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["greek"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YASCI",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isElectronApp = isElectron();
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactClientProvider>
            {/* <ReactQueryDevtools
              position="top"
              buttonPosition="top-right"
              initialIsOpen={true}
            /> */}
            <ToastContainer stacked />
            <Toaster position="top-right" reverseOrder={false} />
            {isElectronApp ? (
              <ResizablePanelGroup
                direction="vertical"
                className="min-h-screen rounded-lg border"
              >
                <ResizablePanel defaultSize={5} maxSize={5} minSize={5}>
                  <MenuBar />
                </ResizablePanel>
                <ResizableHandle disabled />
                <ResizablePanel defaultSize={95}>
                  <BaseLayout>{children}</BaseLayout>
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <BaseLayout>{children}</BaseLayout>
            )}
          </ReactClientProvider>
          <BetterToast />
        </ThemeProvider>
      </body>
    </html>
  );
}

const BaseLayout = async ({ children }: { children: React.ReactNode }) => {
  const auth = await getAuth();
  if (auth) {
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <ScrollArea className="h-screen">
            <Sidebar />
          </ScrollArea>
        </ResizablePanel>
        <ResizablePanel defaultSize={80}>
          <ScrollArea className="h-screen">{children}</ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
  // If not authenticated, show the login page
  return <>{children}</>;
};

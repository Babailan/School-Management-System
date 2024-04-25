import { Inter } from "next/font/google";
import "./global.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactClientProvider from "./react-query-provider";
import Sidebar from "@/app/components/sidebar";
import { Metadata } from "next";
import { Toaster as BetterToast } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  CircleUser, Home,
  LineChart,
  Menu,
  Package,
  Package2, ShoppingCart,
  Users
} from "lucide-react";
import { LogOutSubMenu, ThemeSubMenu } from "@/components/submenu/user";
import { getAccountInformationAction } from "@/actions/account/get-account";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMS - School Management System",
  icons: { icon: "/icon.svg" },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accountInformation = await getAccountInformationAction();

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head></head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ReactClientProvider>
            <ReactQueryDevtools
              position="top"
              buttonPosition="bottom-left"
              initialIsOpen={false}
            />
            <BetterToast />
            {accountInformation ? (
              <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden bg-muted/40 md:block border-r">
                  <Sidebar user={accountInformation} />
                </div>
                <div className="flex flex-col">
                  <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="shrink-0 md:hidden"
                        >
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">
                            Toggle navigation menu
                          </span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="flex flex-col">
                        <nav className="grid gap-2 text-lg font-medium">
                          <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                          >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                          </Link>
                          <Link
                            href="#"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                          >
                            <Home className="h-5 w-5" />
                            Dashboard
                          </Link>
                          <Link
                            href="#"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                          >
                            <ShoppingCart className="h-5 w-5" />
                            Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                              6
                            </Badge>
                          </Link>
                          <Link
                            href="#"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                          >
                            <Package className="h-5 w-5" />
                            Products
                          </Link>
                          <Link
                            href="#"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                          >
                            <Users className="h-5 w-5" />
                            Customers
                          </Link>
                          <Link
                            href="#"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                          >
                            <LineChart className="h-5 w-5" />
                            Analytics
                          </Link>
                        </nav>
                        <div className="mt-auto">
                          <Card>
                            <CardHeader>
                              <CardTitle>Upgrade to Pro</CardTitle>
                              <CardDescription>
                                Unlock all features and get unlimited access to
                                our support team.
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button size="sm" className="w-full">
                                Upgrade
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </SheetContent>
                    </Sheet>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full ml-auto"
                        >
                          <CircleUser className="h-5 w-5" />
                          <span className="sr-only">Toggle user menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={"/settings"}>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </Link>
                        <ThemeSubMenu />
                        <DropdownMenuSeparator />
                        <LogOutSubMenu />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </header>
                  <ScrollArea>
                    <main className="p-4 md:p-6 lg:p-10 max-h-[calc(100vh-3.5rem)] lg:max-h-[calc(100vh-60px)]">
                      {children}
                    </main>
                  </ScrollArea>
                </div>
              </div>
            ) : (
              children
            )}
          </ReactClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

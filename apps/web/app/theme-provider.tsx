import { getAccountInformationAction } from "@/actions/account/get-account";
import _ from "lodash";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

export async function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const accountInfo = await getAccountInformationAction();
  return (
    <NextThemesProvider
      forcedTheme={_.get(accountInfo, "theme", "light")}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

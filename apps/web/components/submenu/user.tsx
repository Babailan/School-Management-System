"use client";
import { useCookies } from "react-cookie";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Moon, Sun, SunMoon } from "lucide-react";
import { accountChangeThemeAction } from "@/actions/account/update-account";

export function LogOutSubMenu() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const logOut = () => {
    removeCookie("user_token");
    location.reload();
  };
  return (
    <DropdownMenuItem onClick={logOut} className="text-red-500">
      <LogOut className="mr-2 w-4 h-4" />
      Log Out
    </DropdownMenuItem>
  );
}

export function ThemeSubMenu() {
  const changeTheme = async (theme: "dark" | "light") => {
    await accountChangeThemeAction(theme);
    location.reload();
  };
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon className="w-4 h-4 mr-2" />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => changeTheme("light")}>
            <Sun className="w-4 h-4 mr-2" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeTheme("dark")}>
            <Moon className="w-4 h-4 mr-2" />
            Dark
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

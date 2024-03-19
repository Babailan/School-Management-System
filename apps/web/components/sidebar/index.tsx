import { LogOutSubMenu, ThemeSubMenu } from "./subMenu";
import Options from "./options";
import { getAuth } from "@/middleware";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  BadgeHelp,
  Book,
  BookOpen,
  Command,
  HandCoins,
  Landmark,
  Moon,
  Route,
  Scroll,
  ScrollText,
  Settings2,
  Sun,
  SunMoon,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/icon/logo";
import { Button } from "../ui/button";
import { accountChangeThemeAction } from "@/actions/account/update-account";
import _ from "lodash";

export default async function Sidebar() {
  const session = await getAuth();
  if (!session) {
    return <></>;
  }
  const userControlOption = [
    {
      title: "Access Control",
      href: "/access-control",
      location: [],
      icon: <UserRoundCog className="w-4 h-4 " />,
    },
  ];
  const subjectTeacherOption = [
    {
      title: "Manage Subject",
      href: "/faculty/manage-subject",
      location: [],
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];
  const enrollmentOption = [
    {
      title: "Assessment",
      href: "/assessment",
      location: [],
      icon: <Route className="w-4 h-4 " />,
    },
    {
      title: "Verification",
      href: "/verification",
      location: [],
      icon: <BadgeHelp className="w-4 h-4 " />,
    },
    {
      title: "Student Fee",
      href: "/student-fee",
      location: [],
      icon: <Landmark className="w-4 h-4 " />,
    },
  ];
  const tuitionOption = [
    {
      title: "Tuition",
      href: "/tuition",
      location: [],
      icon: <HandCoins className="w-4 h-4 " />,
    },
  ];
  const dataManagement = [
    {
      title: "Section",
      href: "/section",
      location: [],
      icon: <Book className="w-4 h-4 " />,
    },
    {
      title: "Curriculum",
      href: "/curriculum",
      location: [],
      icon: <ScrollText className="w-4 h-4 " />,
    },
    {
      title: "Subjects",
      href: "/subjects",
      location: [],
      icon: <Scroll className="w-4 h-4 " />,
    },
  ];

  const includes = (arr, arraysValue) => {
    for (let i = 0; i < arr.length; i++) {
      if (arraysValue.includes(arr[i])) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="min-h-screen *:py-2 *:border-b  flex flex-col">
      <div className="px-4 !py-8">
        <Link href="/">
          <Logo className="w-full hidden lg:block" />
          <Command className="lg:hidden block" />
        </Link>
      </div>
      {includes(session.roles, ["faculty"]) && (
        <Options option={subjectTeacherOption} />
      )}

      {includes(session.roles, ["administrator"]) && (
        <Options option={userControlOption} />
      )}

      {includes(session.roles, ["registrar", "administrator"]) && (
        <Options option={enrollmentOption} />
      )}

      {includes(session.roles, ["administrator"]) && (
        <Options option={tuitionOption} />
      )}
      {includes(session.roles, ["administrator", "registrar"]) && (
        <Options option={dataManagement} />
      )}

      <div className="!p-4 w-fit border-none">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 ml-4">
            <span>
              <Avatar className="size-8">
                <AvatarImage
                  src={"https://avatars.githubusercontent.com/u/83863770?v=4"}
                />
                <AvatarFallback className="uppercase">
                  {session.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </span>
            <span className="capitalize hidden lg:inline">
              {session.firstName} {session.lastName}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 m-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2 className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <ThemeSubMenu />
            <LogOutSubMenu />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

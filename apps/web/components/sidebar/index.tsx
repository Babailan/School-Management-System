import Options from "./options";
import { getAuth } from "@/middleware";

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
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Command className="h-6 w-6" />
          <span>SMS</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
        </nav>
      </div>
    </div>
  );
}

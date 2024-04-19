import Options from "./sidebar-option";

import {
  BadgeHelp,
  Book,
  BookOpen,
  Command,
  HandCoins,
  Landmark,
  Paperclip,
  Route,
  Scroll,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";

export default async function Sidebar({ user }) {
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
      title: "Verification",
      href: "/verification",
      location: [],
      icon: <BadgeHelp className="w-4 h-4 " />,
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
      title: "Subjects",
      href: "/subjects",
      location: [],
      icon: <Scroll className="w-4 h-4 " />,
    },
    {
      // documents
      title: "Documents",
      href: "/documents",
      location: [],
      icon: <Paperclip className="w-4 h-4 " />,
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
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
          {includes(user.roles, ["faculty"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground"></span>
              <Options option={subjectTeacherOption} />
            </div>
          )}

          {includes(user.roles, ["administrator"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Users Control
              </span>
              <Options option={userControlOption} />
            </div>
          )}

          {includes(user.roles, ["registrar", "administrator"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Enrollment Control
              </span>
              <Options option={enrollmentOption} />
            </div>
          )}

          {includes(user.roles, ["administrator"]) && (
            <Options option={tuitionOption} />
          )}
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              Data Management
            </span>
            {includes(user.roles, ["administrator", "registrar"]) && (
              <Options option={dataManagement} />
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

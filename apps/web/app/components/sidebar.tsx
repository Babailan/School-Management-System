import _ from "lodash";
import Options from "./sidebar-option";

import {
  BadgeHelp,
  Book,
  BookOpen,
  Command,
  DollarSign,
  HandCoins,
  Paperclip,
  Scroll,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function Sidebar({ user }) {
  const userControlOption = [
    {
      title: "Access Control",
      href: "/access-control",
      location: [],
      icon: <UserRoundCog size={16} />,
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
  // for registrar and administrator
  const enrollmentOption = [
    {
      title: "Verification",
      href: "/verification",
      location: [],
      icon: <BadgeHelp size={16} />,
    },
  ];
  const student_account = [
    {
      title: "Account Fee",
      href: "/student-fee",
      location: [],
      icon: <DollarSign size={16} />,
    },
  ];
  const tuitionOption = [
    {
      title: "Tuition",
      href: "/tuition",
      location: [],
      icon: <HandCoins size={16} />,
    },
  ];
  const dataManagement = [
    {
      title: "Section",
      href: "/section",
      location: [],
      icon: <Book size={16} />,
    },
    {
      title: "Subjects",
      href: "/subjects",
      location: [],
      icon: <Scroll size={16} />,
    },
    {
      // documents
      title: "Documents",
      href: "/documents",
      location: [],
      icon: <Paperclip size={16} />,
    },
  ];

  //check if some values exist in the array
  const customIntersection = (firstArray, secondArray) => {
    // Use _.intersection() to find common values between the two arrays
    const intersection = _.intersection(firstArray, secondArray);
    // If the intersection array has any elements, return true
    return intersection.length > 0;
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
          <div>
            {user.roles.map((role) => (
              <Badge key={role} className="capitalize" variant="secondary">{role}</Badge>
            ))}
          </div>
          {customIntersection(user.roles, ["faculty"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground"></span>
              <Options option={subjectTeacherOption} />
            </div>
          )}

          {customIntersection(user.roles, ["administrator"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Users Control
              </span>
              <Options option={userControlOption} />
            </div>
          )}

          {customIntersection(user.roles, ["registrar", "administrator"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Enrollment Control
              </span>
              <Options option={enrollmentOption} />
            </div>
          )}

          {customIntersection(user.roles, ["administrator", "cashier"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Student Account
              </span>
              <Options option={student_account} />
            </div>
          )}
          {customIntersection(user.roles, ["administrator", "cashier"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Payment Fee</span>
              <Options option={tuitionOption} />
            </div>
          )}

          {customIntersection(user.roles, ["administrator", "registrar"]) && (
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">
                Data Management
              </span>
              <Options option={dataManagement} />
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

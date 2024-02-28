import {
  Avatar,
  Box,
  Flex,
  Heading,
  PopoverContent,
  PopoverRoot,
  ScrollArea,
  Text,
  PopoverTrigger,
  Button,
  Inset,
  Card,
} from "@radix-ui/themes";
import DarkLogo from "../../assets/black_yasc_logo.png";
import Image from "next/image";
import { CaretSortIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutButton from "./LogOutButton";

function Options({ option, header }) {
  return (
    <Box>
      <Box>
        <Heading size={"2"} mb={"2"}>
          {header}
        </Heading>
        {option.map((option, idx) => {
          return (
            <Link href={option.href} key={idx}>
              <Text
                className="py-2 hover:border-indigo-500 border-l border-indigo-200 hover:border-l px-5 cursor-pointer"
                as="div"
                size={"2"}
              >
                {option.title}
              </Text>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}

export default async function Sidebar() {
  const session = await getServerSession();
  if (!session) {
    return <></>;
  }
  const userControlOption = [
    { title: "Access Control", href: "/access-control", location: [] },
  ];
  const subjectTeacherOption = [
    { title: "Manage Subject", href: "/faculty/manage-subject", location: [] },
  ];
  const enrollmentOption = [
    {
      title: "Assessment",
      href: "/assessment",
      location: [],
    },
    {
      title: "Verification",
      href: "/verification",
      location: [],
    },
  ];
  const tuitionOption = [
    {
      title: "Tuition",
      href: "/tuition",
      location: [],
    },
  ];
  const dataManagement = [
    {
      title: "Section",
      href: "/section",
      location: [],
    },
    {
      title: "Curriculum",
      href: "/curriculum",
      location: [],
    },
    {
      title: "Subjects",
      href: "/subjects",
      location: [],
    },
  ];

  return (
    <ScrollArea className="max-h-screen max-w-60">
      <Flex className=" min-h-screen" direction={"column"}>
        <Box className="flex-1">
          <Box className="px-5">
            <Box className="relative h-32">
              <Image
                src={DarkLogo}
                fill={true}
                quality={75}
                alt="Logo"
                className="object-contain"
              />
            </Box>
          </Box>
          <Box p={"5"} className="space-y-5">
            <Options option={subjectTeacherOption} header={"Subject Teacher"} />
            <Options option={userControlOption} header={"User Control"} />
            <Options option={enrollmentOption} header={"Enrollment"} />
            <Options option={tuitionOption} header={"Fees"} />
            <Options option={dataManagement} header={"Data Management"} />
          </Box>
        </Box>
        <Box p={"5"}>
          <Flex align={"center"} justify={"between"} gap={"2"}>
            <Flex>
              <Avatar
                src="https://randomuser.me/api/portraits/women/79.jpg"
                radius="full"
                fallback={"P"}
                mr={"2"}
              ></Avatar>
              <Box display={"inline"}>
                <Text as="div" weight={"bold"} size={"2"}>
                  Jennifer
                </Text>
                <Text as="div" size={"1"}>
                  Faculty
                </Text>
              </Box>
            </Flex>
            <Box>
              <PopoverRoot>
                <PopoverTrigger>
                  <CaretSortIcon className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <LogoutButton />
                </PopoverContent>
              </PopoverRoot>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </ScrollArea>
  );
}

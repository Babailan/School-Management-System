"use client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import DarkLogo from "../../assets/yasc_logo_black.jpg";
import Image from "next/image";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "usehooks-ts";
import Link from "next/link";

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

export default function Sidebar() {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");
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

  const logoutUser = () => {
    setUserToken("");
  };
  if (userToken == "") return null;
  return (
    <ScrollArea className="max-h-screen max-w-60">
      <Flex className="border min-h-screen" direction={"column"}>
        <Box className="flex-1">
          <Box className="border px-5">
            <Image src={DarkLogo} alt="A house in a forest" className="w-52" />
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
              <Popover.Root>
                <Popover.Trigger>
                  <CaretSortIcon className="cursor-pointer" />
                </Popover.Trigger>
                <Popover.Content className="w-60">
                  <Text
                    className="w-full hover:cursor-pointer"
                    as="div"
                    size={"2"}
                    onClick={logoutUser}
                  >
                    Log Out
                  </Text>
                </Popover.Content>
              </Popover.Root>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </ScrollArea>
  );
}

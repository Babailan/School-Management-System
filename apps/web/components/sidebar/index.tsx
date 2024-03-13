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
  Badge,
} from "@radix-ui/themes";
import DarkLogo from "../../assets/black_yasc_logo.png";
import Image from "next/image";
import { CaretSortIcon } from "@radix-ui/react-icons";
import LogoutButton from "./log-out-button";
import Options from "./options";
import { getAuth } from "@/middleware";

export default async function Sidebar() {
  const session = await getAuth();
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
    {
      title: "Student Fee",
      href: "/student-fee",
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
                fallback={"f"}
                mr={"2"}
              ></Avatar>
              <Flex direction="column">
                <Text weight={"bold"} size={"2"}>
                  {session.firstName}
                </Text>
                {session.roles.map((role, idx) => {
                  return (
                    <Badge key={idx} className="capitalize">
                      {role}
                    </Badge>
                  );
                })}
              </Flex>
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

"use client";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  SelectSex,
  SelectStrand,
  SelectYear,
} from "../../../components/select";
import { useState } from "react";
import { CheckIcon, CheckboxIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { CheckmarkIcon } from "react-hot-toast";

export default function Page() {
  const { id } = useParams();
  const [updatedStudent, setUpdateStudent] = useState<any>({});

  console.log(updatedStudent);

  const { data, isPending, isError } = useQuery({
    queryKey: ["verification-edit", id],
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/api/student-verification/${id}`))
        .data,
  });

  if (isPending) {
    return <></>;
  }

  const setUpdatedStudentField = (field: string, value: string | number) => {
    setUpdateStudent((p) => ({ ...p, [field]: value }));
  };
  return (
    <Box p="6" className="space-y-5">
      <Box>
        <Heading>Editing Student</Heading>
        <Text size="2" color="gray">
          Make sure all the data is accurate.
        </Text>
      </Box>
      <Text mt={"5"} as="div" weight={"medium"}>
        Personal Information
      </Text>
      <Flex gap="4" wrap={"wrap"} className="max-w-screen-md">
        <Box>
          <Text size="2">First Name</Text>
          <TextField.Input
            onChange={(e) =>
              setUpdatedStudentField("firstName", e.target.value)
            }
            defaultValue={data.firstName}
          ></TextField.Input>
        </Box>
        <Box>
          <Text size="2">Last Name</Text>
          <TextField.Input
            onChange={(e) => setUpdatedStudentField("lastName", e.target.value)}
            defaultValue={data.lastName}
          ></TextField.Input>
        </Box>
        <Box>
          <Text size="2">Middle Name</Text>
          <TextField.Input
            onChange={(e) =>
              setUpdatedStudentField("middleName", e.target.value)
            }
            defaultValue={data.middleName}
          ></TextField.Input>
        </Box>
        <Box>
          <Text size="2">Age</Text>
          <TextField.Input
            defaultValue={data.age}
            type="number"
          ></TextField.Input>
        </Box>
        <Box>
          <Text size="2">Phone Number</Text>
          <TextField.Input
            onChange={(e) =>
              setUpdatedStudentField("phoneNumber", e.target.value)
            }
            defaultValue={data.phoneNumber}
          ></TextField.Input>
        </Box>
        <Box width={"100%"}>
          <SelectStrand
            onValueChange={(strand) => setUpdatedStudentField("strand", strand)}
            defaultValue={data.strand}
          />
        </Box>
        <Box width={"100%"}>
          <Text size="2">Guardian Angel</Text>
          <TextField.Input defaultValue={data.guardian}></TextField.Input>
        </Box>
        <Box width={"100%"}>
          <Text size="2">Address Location</Text>
          <TextField.Input defaultValue={data.address}></TextField.Input>
        </Box>
        <Flex align={"center"} gap={"3"} width={"100%"}>
          <Text size="2">School Year</Text>
          <SelectYear defaultValue={data.year}></SelectYear>
        </Flex>
        <SelectSex defaultValue={data.sex} />
      </Flex>
      <Box className="space-x-4">
        <Button className="hover:cursor-pointer">
          <Pencil2Icon />
          Update Information
        </Button>
        <Button className="hover:cursor-pointer" color="grass">
          <CheckIcon />
          Update Information and Approve
        </Button>
      </Box>
    </Box>
  );
}

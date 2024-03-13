"use client";

import { GetVerificationByIdAction } from "@/actions/verification/get-verification";
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  Heading,
  Select,
  Strong,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import Birthdate from "./birthdate";
import {
  SelectGradeLevel,
  SelectSex,
  SelectStrand,
  SelectYear,
} from "@/components/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/loading";
import {
  updateVerificationAction,
  updateVerificationInfomationAction,
} from "@/actions/verification/update-verification";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { getTuitionAction } from "@/actions/tuition/get-tuition";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import numeral from "numeral";
import { useRouter } from "next/navigation";

export default function Page({ params: { _id } }) {
  const navigation = useRouter();
  const queryClient = useQueryClient();
  const form = useRef<HTMLFormElement>(null);
  const [tuition, setTuition] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["verification-accept", _id],
    queryFn: async () => GetVerificationByIdAction(_id),
  });
  const tuitionList = useQuery({
    queryKey: ["tuitionlist"],
    queryFn: async () => await getTuitionAction(),
  });

  const updateInformation = async (formData: FormData) => {
    formData.append("_id", _id);
    const toastID = toast.loading("Please wait...");
    const result = await updateVerificationInfomationAction(formData);
    if (result.success) {
      toast.update(toastID, {
        render: "Information updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      queryClient.refetchQueries();
    } else {
      toast.update(toastID, {
        render: result.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const updateVerification = async (formData: FormData) => {
    formData.append("_id", _id);
    const toastID = toast.loading("Please wait...");
    const result = await updateVerificationAction(formData);
    if (result.success) {
      toast.update(toastID, {
        render: "Information updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      queryClient.refetchQueries();
      navigation.push("/verification");
    } else {
      toast.update(toastID, {
        render: result.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  if (isPending || tuitionList.isPending) {
    return <Loading p="6" />;
  }

  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>Accept Student Verification</Heading>
        <Text color="gray">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </Flex>
      <form ref={form} action={updateVerification} className="space-y-5">
        <Box>
          <Heading size={"4"}>Personal Information</Heading>
          <Flex gap="4">
            <Box>
              <Text size="2">First Name</Text>
              <TextFieldInput
                name="firstName"
                defaultValue={data.firstName}
              ></TextFieldInput>
            </Box>
            <Box>
              <Text size="2">Last Name</Text>
              <TextFieldInput
                name="lastName"
                defaultValue={data.lastName}
              ></TextFieldInput>
            </Box>
            <Box>
              <Text size="2">Middle Name</Text>
              <TextFieldInput
                name="middleName"
                defaultValue={data.middleName}
              ></TextFieldInput>
            </Box>
          </Flex>

          <Birthdate date={data.birthdate} />
          <Box>
            <Text size="2">Sex</Text>
            <SelectSex defaultValue={data.sex} name="sex" />
          </Box>
          <Box>
            <Text size="2">Address</Text>
            <TextFieldInput
              name="address"
              defaultValue={data.address}
            ></TextFieldInput>
          </Box>
          <Box>
            <Text size="2">Email Address</Text>
            <TextFieldInput
              name="email"
              defaultValue={data.email}
            ></TextFieldInput>
          </Box>
          <Box>
            <Text size="2">Phone Number</Text>
            <TextFieldInput
              name="phone"
              defaultValue={data.phone}
            ></TextFieldInput>
          </Box>
          <Box>
            <Text size="2">Guardian Name</Text>
            <TextFieldInput
              name="guardian"
              defaultValue={data.guardian}
            ></TextFieldInput>
          </Box>
          <Flex gap="3">
            <Box>
              <Text size="2">Strand</Text>
              <Box>
                <SelectStrand
                  defaultValue={data.strand}
                  name="strand"
                ></SelectStrand>
              </Box>
            </Box>
            <Box>
              <Text size="2">Year</Text>
              <Box>
                <SelectYear defaultValue={data.year} name="year" />
              </Box>
            </Box>
            <Box>
              <Text size="2">Grade Level</Text>
              <Box>
                <SelectGradeLevel
                  defaultValue={data.gradeLevel}
                  name="gradeLevel"
                />
              </Box>
            </Box>
          </Flex>
        </Box>
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <Strong>Notice : </Strong> Please select the tuition fee for this
            student.
          </Callout.Text>
        </Callout.Root>
        <Flex direction="column" gap="2">
          <Text size="2">Tuition Fee</Text>
          <Select.Root
            name="tuition"
            onValueChange={(value) => setTuition(value)}
          >
            <Select.Trigger placeholder="Tuition"></Select.Trigger>
            <Select.Content position="popper">
              {tuitionList?.data?.map((tuition, idx) => {
                return (
                  <Select.Item key={idx} value={tuition.amount}>
                    {tuition.tuition_title}
                  </Select.Item>
                );
              })}
            </Select.Content>
          </Select.Root>
          {tuition && (
            <Text size="2">Amount : {numeral(tuition).format(",")}</Text>
          )}
        </Flex>
        <Flex gap="2">
          <Button formAction={updateInformation}>Update Information</Button>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Confirm Student</Button>
            </Dialog.Trigger>
            <Dialog.Content
              style={{
                maxWidth: 400,
              }}
            >
              <Dialog.Title>Confirm Student</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to confirm this student?
              </Dialog.Description>
              <Dialog.Close>Cancel</Dialog.Close>
              <Flex justify="end" gap="2" mt="5">
                <Dialog.Close>
                  <Button color="gray">Cancel</Button>
                </Dialog.Close>
                <Dialog.Trigger>
                  <Button onClick={() => form.current?.requestSubmit()}>
                    Confirm
                  </Button>
                </Dialog.Trigger>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </form>
    </Box>
  );
}

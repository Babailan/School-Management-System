"use client";

import { addTuitionAction } from "@/actions/tuition/add-tuition";
import PesoInput from "@/components/input/pesoinput";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { toast } from "react-toastify";

export default function Page() {
  const add = async (formData: FormData) => {
    const loading = toast.loading("Please wait...");
    const result = await addTuitionAction(formData);
    if (result.success) {
      toast.update(loading, {
        render: "Tuition added successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      toast.update(loading, {
        render: result.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>New Tuition Fee</Heading>
        <Text color="gray">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Text>
      </Flex>
      <form action={add} className="space-y-4">
        <Box>
          <Text size="2">Tuition Title</Text>
          <TextFieldInput name="tuition_title"></TextFieldInput>
        </Box>
        <Box>
          <Text size="2">Amount Fee</Text>
          <PesoInput name="amount"></PesoInput>
        </Box>
        <Button>Save</Button>
      </form>
    </Box>
  );
}

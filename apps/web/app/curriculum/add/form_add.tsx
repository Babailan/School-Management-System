"use client";
import React, { useRef } from "react";
import { Flex, Text, Box, Button, AlertDialog } from "@radix-ui/themes"; // Replace 'your-ui-library' with the actual UI library you are using
import { PlusIcon } from "@radix-ui/react-icons"; // Replace 'your-icon-library' with the actual icon library you are using
import {
  SelectYear,
  SelectGradeLevel,
  SelectSemester,
} from "@/components/select"; // Replace 'your-custom-components' with the actual custom components you are using
import { AddCurriculumAction } from "@/actions/curriculum/add-curriculum";
import { toast } from "react-toastify";

const FormAddCurriculum = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (formData: FormData) => {
    // Handle form submission logic here
    const toastID = toast.loading("Please wait...");
    const result = await AddCurriculumAction(formData);
    if (result.success) {
      toast.update(toastID, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      toast.update(toastID, {
        render: result.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <form action={submit} ref={formRef} className="space-y-4">
      <Flex direction="column">
        <Text size="2">Year</Text>
        <SelectYear name="year" />
      </Flex>
      <Flex direction="column">
        <Text size="2">Grade Level</Text>
        <SelectGradeLevel name="gradeLevel" />
      </Flex>
      <Flex direction="column">
        <Text size="2">Semester</Text>
        <SelectSemester name="semester" />
      </Flex>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Box>
            <Button type="button">
              <PlusIcon />
              Add Curriculum
            </Button>
          </Box>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Add Curriculum</AlertDialog.Title>
          <AlertDialog.Description size="1">
            Are you sure? Once you confirm, the curriculum will be added.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Box>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Box>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Box>
                <Button onClick={() => formRef.current?.requestSubmit()}>
                  Confirm
                </Button>
              </Box>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </form>
  );
};

export default FormAddCurriculum;

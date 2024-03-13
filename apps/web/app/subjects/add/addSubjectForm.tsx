"use client";

import AddSubjectAction from "@/actions/subject/add-subject";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Box,
  Text,
  TextField,
  AlertDialog,
  Button,
  Flex,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function AddSubjectForm() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const submit = async (formData: FormData) => {
    const toastID = toast.loading("Please wait...");
    const result = await AddSubjectAction(formData);
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
    <form ref={form} className="space-y-5" action={submit}>
      <Box className="space-y-2">
        <Box>
          <Text size="2" color="gray" weight="medium">
            Subject Code
          </Text>
          <TextField.Input
            className="uppercase"
            name="subjectCode"
          ></TextField.Input>
        </Box>
        <Box>
          <Text size="2" color="gray" weight="medium">
            Subject Name
          </Text>
          <TextField.Input
            className="uppercase"
            name="subjectName"
          ></TextField.Input>
        </Box>
      </Box>
      <Flex gap="2">
        <Button
          type="button"
          color="gray"
          onClick={() => router.push("/subjects")}
        >
          Go back
        </Button>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button className="hover:cursor-pointer">
              <CheckIcon />
              Create a Subject
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>
              Confirm to create a new subject
            </AlertDialog.Title>
            <AlertDialog.Description size="2">
              This action will create a new subject. Are you sure you want to
              proceed?
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
                  <Button onClick={() => form.current?.requestSubmit()}>
                    Confirm
                  </Button>
                </Box>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </form>
  );
}

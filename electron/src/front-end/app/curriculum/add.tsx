"use client";

import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  Table,
  AlertDialog,
} from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { SelectGradeLevel, SelectYear } from "../../components/select";

export default function CurriculumAdd() {
  const [year, setYear] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const submit = () => {
    toast.promise(
      axios.post("http://localhost:3001/api/curriculum", {
        year,
        gradeLevel,
      }),
      {
        loading: "Please wait...",
        success: "Successfully Added",
        error: (r) => {
          return <b className="text-sm">{r.response.data}</b>;
        },
      }
    );
  };

  return (
    <Box className="space-y-2">
      <Box>
        <Text size={"3"} weight={"bold"}>
          Curriculum Information
        </Text>
      </Box>
      <Box></Box>
      <Box className="space-y-2">
        <Flex align={"center"} gap={"4"}>
          <Label.Root className="text-sm">Year</Label.Root>
          <SelectYear onValueChange={(value) => setYear(value)} />
        </Flex>
        <SelectGradeLevel onValueChange={(value) => setGradeLevel(value)} />
      </Box>
      <Flex justify={"end"}>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Box>
              <Button>
                <PlusIcon />
                Add Curriculum
              </Button>
            </Box>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Add Curriculum</AlertDialog.Title>
            <AlertDialog.Description size="1">
              Are you sure? Once you confirm the curriculum will be added.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Box>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Box>
              </AlertDialog.Cancel>
              <AlertDialog.Action onClick={submit}>
                <Box>
                  <Button>Confirm</Button>
                </Box>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </Box>
  );
}

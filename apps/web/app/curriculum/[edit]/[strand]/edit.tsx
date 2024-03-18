"use client";

import { UpdateStrandSubjectAction } from "@/actions/curriculum/update-curriculum";
import { InfoCircledIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Table, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditCurriculumStrand({ subjects, isPending }) {
  const { edit, strand } = useParams();
  const queryClient = useQueryClient();

  const [subject, setSubject] = useState(subjects || []);
  const [addSubject, setAddSubject] = useState<any[]>([]);
  const [removeSubject, setRemoveSubject] = useState<string[]>([]);

  const submit = async () => {
    const toastID = toast.loading("Please Wait...");

    const result = await UpdateStrandSubjectAction({
      add: addSubject.map((subject) => subject._id),
      remove: removeSubject,
      strand: strand as string,
      id: edit as string,
    });
    if (result.success) {
      toast.update(toastID, {
        render: "Subject Updated Successfully.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      queryClient.clear();
    } else {
      toast.update(toastID, {
        render: result.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  const addSubjectHandler = (newSubject) => {
    if (
      subject
        .concat(addSubject)
        .some((s) => s.subjectCode === newSubject.subjectCode)
    ) {
      toast.warn("Subject already added");
      return;
    }
    setAddSubject([...addSubject, newSubject]);
  };
  const removeSubjectHandler = (selectedSubject) => {
    if (subject.some((s) => s.subjectCode === selectedSubject.subjectCode)) {
      setSubject(
        subject.filter((s) => s.subjectCode !== selectedSubject.subjectCode)
      );
      setRemoveSubject([...removeSubject, selectedSubject._id]);
    }
    if (addSubject.some((s) => s.subjectCode === selectedSubject.subjectCode)) {
      setAddSubject(
        addSubject.filter((s) => s.subjectCode !== selectedSubject.subjectCode)
      );
    }
  };
  return (
    <>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          <Text>Make sure to Update the subject before exitting.</Text>
        </Callout.Text>
      </Callout.Root>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!subject.concat(addSubject).length && (
            <Table.Row align="center">
              <Table.Cell colSpan={3} justify="center">
                <Text>No Available subject for this</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {subject.concat(addSubject).map((subject, idx) => {
            return (
              <Table.Row align="center" key={idx}>
                <Table.Cell>
                  <Text className="uppercase" weight="medium">
                    {subject.subjectName}
                  </Text>
                </Table.Cell>
                <Table.Cell className="uppercase">
                  <Text className="uppercase" weight="medium">
                    {subject.subjectCode}
                  </Text>
                </Table.Cell>
                <Table.Cell justify="end">
                  <Button
                    color="red"
                    className="hover:cursor-pointer"
                    onClick={() => removeSubjectHandler(subject)}
                  >
                    <TrashIcon />
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row align="center">
            <Table.Cell colSpan={3} justify="end">
              {/* <SelectSubject
                onClick={(object) => {
                  addSubjectHandler(object);
                }}
              /> */}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Flex mt="5" gap="2">
        <Link href={`/curriculum/${edit}`}>
          <Button color="gray">Go Back</Button>
        </Link>
        <Button onClick={submit}>
          <UpdateIcon />
          Update Subjects
        </Button>
      </Flex>
    </>
  );
}

"use client";

import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Strong,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import SearchInput from "../../components/input/search";
import { useEffect, useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [student, setStudent] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    const result = await fetch(
      "http://localhost:3001/api/search-verification",
      {
        body: JSON.stringify({ query: searchInput, page }),
        method: "POST",
      }
    );
    const data = await result.json();
    return data;
  };
  useEffect(() => {
    handleSearch().then((data) => setStudent(data));
  }, [searchInput]);
  return (
    <Box className="space-y-3">
      <Heading>Student Verification</Heading>
      <SearchInput
        onChange={(e) => setSearchInput(e.target.value)}
        size={"3"}
        placeholder="Search for verification"
      />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reference Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Strand</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {student.map((student) => {
            return (
              <Table.Row key={student._id}>
                <Table.RowHeaderCell>{student.fullname}</Table.RowHeaderCell>
                <Table.Cell>{student.referenceNumber}</Table.Cell>
                <Table.Cell>{student.gradeLevel}</Table.Cell>
                <Table.Cell>{student.strand}</Table.Cell>
                <Table.Cell>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Box>
                        <Button
                          color="green"
                          className="hover:cursor-pointer"
                          size={"1"}
                        >
                          <CheckIcon />
                          Approve
                        </Button>
                      </Box>
                    </Dialog.Trigger>

                    <Dialog.Content style={{ maxWidth: 450 }}>
                      <Dialog.Title>Approve Verification</Dialog.Title>
                      <Dialog.Description size="2" mb="4">
                        Make changes to student.
                      </Dialog.Description>
                      <Flex direction={"column"}>
                        <Text size={"2"}>
                          <Strong>Full Name : {student.fullname} </Strong>
                        </Text>
                        <Text size={"2"}>
                          <Strong>Grade Level : {student.gradeLevel} </Strong>
                        </Text>
                        <Text size={"2"}>
                          <Strong>Strand : {student.strand} </Strong>
                        </Text>
                      </Flex>

                      <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                          <Box>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Box>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Box>
                            <Button>Confirm Approval</Button>
                          </Box>
                        </Dialog.Close>
                      </Flex>
                    </Dialog.Content>
                  </Dialog.Root>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

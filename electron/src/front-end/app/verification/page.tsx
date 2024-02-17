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
} from "@radix-ui/themes";
import SearchInput from "../../components/input/search";
import { useEffect, useState } from "react";
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Pagination from "../../components/pagination/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SelectLimit, SelectYear } from "../../components/select";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [limit, setLimit] = useState("10");
  const queryClient = useQueryClient();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["search-verification", searchInput, page, year, limit],
    queryFn: async () =>
      (
        await axios.get(
          "http://localhost:3001/api/student-verification/search",
          {
            params: {
              query: searchInput,
              page,
              limit,
              year,
            },
          }
        )
      ).data,
  });

  useEffect(() => {
    setPage(1);
  }, [searchInput, year, limit]);

  async function handleApprove(_id) {
    // Verify the student by _id
    await toast.promise(
      axios.put("http://localhost:3001/api/student-verification", { _id }),
      {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
    queryClient.clear();
    refetch();
  }

  return (
    <Box className="space-y-3" p="6">
      <Heading>Student Verification</Heading>
      <Text size={"2"} color="gray">
        Comprehensive List of Students Scheduled for Assessment
      </Text>
      <Flex direction="column" gap={"2"}>
        <SelectYear onValueChange={(v) => setYear(v)} value={year} />
        <SelectLimit onValueChange={(v) => setLimit(v)} value={limit} />
      </Flex>
      <SearchInput
        onChange={(e) => setSearchInput(e.target.value)}
        size={"3"}
        placeholder="Search for verification"
      />
      {isPending ? (
        <Box
          width={"100%"}
          className="h-96 bg-gray-200 animate-pulse rounded-md"
        ></Box>
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Reference Number</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Strand</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data?.results.length ? (
              data?.results.map((student) => {
                return (
                  <Table.Row key={student._id} align={"center"}>
                    <Table.Cell>
                      <Text color="blue">For Verification</Text>
                    </Table.Cell>
                    <Table.Cell>{student.fullname}</Table.Cell>
                    <Table.Cell>{student.referenceNumber}</Table.Cell>
                    <Table.Cell>{student.gradeLevel}</Table.Cell>
                    <Table.Cell>{student.strand}</Table.Cell>
                    <Table.Cell>
                      <Flex gap={"2"} justify={"end"}>
                        <Link href={`/verification/${student._id}`}>
                          <Button className="hover:cursor-pointer">
                            <Pencil1Icon />
                            Edit
                          </Button>
                        </Link>
                        <Dialog.Root>
                          <Dialog.Trigger>
                            <Box>
                              <Button
                                color="grass"
                                className="hover:cursor-pointer"
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
                                <Strong>
                                  Grade Level : {student.gradeLevel}{" "}
                                </Strong>
                              </Text>
                              <Text size={"2"}>
                                <Strong>Strand : {student.strand} </Strong>
                              </Text>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                              <Dialog.Close>
                                <Button
                                  variant="soft"
                                  color="gray"
                                  className="hover:cursor-pointer"
                                >
                                  Cancel
                                </Button>
                              </Dialog.Close>
                              <Dialog.Close>
                                <Button
                                  className="hover:cursor-pointer"
                                  onClick={() => handleApprove(student._id)}
                                >
                                  Confirm Approval
                                </Button>
                              </Dialog.Close>
                            </Flex>
                          </Dialog.Content>
                        </Dialog.Root>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={5}
                  className="font-medium"
                  align="center"
                  justify={"center"}
                >
                  No student verification found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      )}

      <Pagination maxPage={data?.maxPage} page={page} setPage={setPage} />
    </Box>
  );
}

"use client";

import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  Heading,
  Strong,
  Table,
  Text,
} from "@radix-ui/themes";
import SearchInput from "../../components/input/search";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import Pagination from "../../components/pagination/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SelectLimit, SelectYear } from "../../components/select";
import { GetVerificationSearchAction } from "@/actions/verification/get-verification";
import { useEffect, useState } from "react";

import Loading from "../loading";
import Link from "next/link";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  // const [year, setYear] = useState(new Date().getFullYear().toString());
  // const [limit, setLimit] = useState("10");
  // const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryFn: async () => GetVerificationSearchAction(searchInput, page, 10),
    queryKey: ["verification", searchInput, page],
  });
  useEffect(() => {
    setPage(1);
  }, [searchInput]);

  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>Verification</Heading>
        <Text color="gray">
          All students that for verification are listed in the table
        </Text>
      </Flex>
      <Box>
        <SearchInput
          size="2"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for student"
        />
      </Box>
      <Box>
        <Callout.Root color="amber">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            <Strong>Notice:</Strong> This page is for verification of students
            that are not yet verified once you verified the student it will be
            assessed
          </Callout.Text>
        </Callout.Root>
      </Box>
      <Box>
        {isPending ? (
          <Loading />
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row align="center">
                <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Middle Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Strand</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Year</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  Reference Number
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data?.results.map((student, idx) => {
                return (
                  <Table.Row key={idx} align="center">
                    <Table.RowHeaderCell>
                      {student.firstName}
                    </Table.RowHeaderCell>
                    <Table.Cell>{student.lastName}</Table.Cell>
                    <Table.Cell>{student.middleName}</Table.Cell>
                    <Table.Cell>{student.gradeLevel}</Table.Cell>
                    <Table.Cell>{student.strand}</Table.Cell>
                    <Table.Cell>{student.year}</Table.Cell>
                    <Table.Cell>{student.referenceNumber}</Table.Cell>
                    <Table.Cell>
                      <Flex align="center" justify="end" gap="2">
                        <Link href={`/verification/accept/${student._id}`}>
                          <Button color="grass" variant="surface">
                            <CheckIcon />
                            Verify
                          </Button>
                        </Link>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              {data?.results.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={6} justify="center">
                    <Text color="gray">No data found</Text>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
      <Box>
        <Pagination
          maxPage={data?.totalPages || 1}
          page={page}
          setPage={setPage}
        ></Pagination>
      </Box>
    </Box>
  );
}

"use client";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Table,
  Link as RadixLink,
} from "@radix-ui/themes";
import { useState } from "react";
import Pagination from "../../components/pagination/pagination";
import { useQuery } from "@tanstack/react-query";
import SearchSubjectActions from "@/actions/subject/search-subject";
import Link from "next/link";
import Loading from "@/app/loading";

export default function ListSubjectPage() {
  const [page, setPage] = useState(1);
  const { isPending, data, isError } = useQuery({
    queryKey: ["subject", page],
    queryFn: async () => await SearchSubjectActions(page, "", 10),
  });

  if (isPending) {
    return <Loading p="6" />;
  }
  if (isError) {
    return <Heading>Something went wrong</Heading>;
  }
  return (
    <Flex direction={"column"} gap={"5"}>
      <Flex justify="between" align="center">
        <Box>
          <Heading>Subject List</Heading>
          <Text color="gray" size="2">
            Available subject list in minutes
          </Text>
        </Box>
        <Box>
          <Link href={"/subjects/add"} legacyBehavior>
            <RadixLink size="2">Add Subject</RadixLink>
          </Link>
        </Box>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.results.map(({ subjectCode, subjectName }, idx) => {
            return (
              <Table.Row key={idx} align={"center"} className="font-medium">
                <Table.Cell className="whitespace-nowrap uppercase">
                  {subjectName}
                </Table.Cell>
                <Table.Cell className="uppercase">{subjectCode}</Table.Cell>
                <Table.Cell justify={"end"}>
                  <Box className="space-x-2 whitespace-nowrap">
                    <Button className="hover:cursor-pointer" variant="surface">
                      <Pencil1Icon /> Edit
                    </Button>
                    <Button
                      color="red"
                      className="hover:cursor-pointer"
                      variant="surface"
                    >
                      <TrashIcon /> Delete
                    </Button>
                  </Box>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination maxPage={data.maxPage} page={page} setPage={setPage} />
    </Flex>
  );
}

"use client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Text,
  Link as RadixLink,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { SelectYear } from "../../components/select";
import { useState } from "react";
import { GetSectionByFilterAction } from "@/actions/section/get-section";
import numeral from "numeral";

export default function SectionList() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const { data, isPending } = useQuery({
    queryKey: ["section-list-page", year],
    queryFn: async () => await GetSectionByFilterAction({ year }),
  });

  console.log(data);
  return (
    <Box className="space-y-4" p={"6"}>
      <Flex align="center" justify="between">
        <Box>
          <Heading>Section List</Heading>
          <Text size={"2"} color="gray">
            List of available of section
          </Text>
        </Box>
        <Box>
          <Link href={"/section/add"} legacyBehavior>
            <RadixLink>Add Section</RadixLink>
          </Link>
        </Box>
      </Flex>
      <Flex direction={"column"} gap={"2"}>
        <SelectYear value={year} onValueChange={(v) => setYear(v)}></SelectYear>
      </Flex>
      {isPending ? (
        <Box>
          <Skeleton height={30}></Skeleton>
          <Skeleton height={500}></Skeleton>
          <Skeleton height={50}></Skeleton>
        </Box>
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Section Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Academic Strand</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Semester</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data?.map(({ _id, gradeLevel, strand, sectionName, semester }) => (
              <Table.Row key={_id} className="font-medium" align={"center"}>
                <Table.Cell>{sectionName}</Table.Cell>
                <Table.Cell>{gradeLevel}</Table.Cell>
                <Table.Cell>{strand}</Table.Cell>
                <Table.Cell>
                  {numeral(semester).format("0o")} Semester
                </Table.Cell>
                <Table.Cell justify="end">
                  <Link href={`/section/edit/${_id}`}>
                    <Button className="hover:cursor-pointer" variant="surface">
                      <Pencil1Icon />
                      Edit
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
            {!!data?.length || (
              <Table.Row className="font-medium">
                <Table.Cell colSpan={4} align="center">
                  <Text>There is no section for this year.</Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}

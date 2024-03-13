"use client";

import {
  Box,
  Button,
  Flex,
  Table,
  Text,
  Link as RadixLink,
  Heading,
} from "@radix-ui/themes";
import SelectYear from "../../components/select/year";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { GetCurriculumByFilter } from "@/actions/curriculum/get-curriculum";
import Loading from "@/app/loading";
import numeral from "numeral";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { data, isPending } = useQuery({
    queryKey: ["curriculum-list", year],
    queryFn: async () => await GetCurriculumByFilter({ year }),
  });

  return (
    <Box className="space-y-5" p="6">
      <Flex direction="column">
        <Heading>Curriculum</Heading>
        <Text color="gray">List of available are listed in the table.</Text>
      </Flex>
      <Flex justify="between">
        <SelectYear
          onValueChange={(year) => setYear(year)}
          defaultValue={year}
        />
        <Link href={"/curriculum/add"} legacyBehavior>
          <RadixLink>Add a curriculum</RadixLink>
        </Link>
      </Flex>
      <CurriculumList data={data} year={year} isPending={isPending} />
    </Box>
  );
}

function CurriculumList({ data, year, isPending }) {
  if (isPending) {
    return <Loading />;
  }
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Curriculum Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Semester</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.length == 0 && (
          <Table.Row align={"center"}>
            <Table.Cell justify={"center"} colSpan={2}>
              <Text weight="medium">
                No available Curriculum for the year {year} - {Number(year) + 1}
              </Text>
            </Table.Cell>
          </Table.Row>
        )}
        {data.map(({ _id, gradeLevel, semester }, idx) => {
          return (
            <Table.Row key={idx} align={"center"}>
              <Table.RowHeaderCell>
                Grade {gradeLevel} Senior High
              </Table.RowHeaderCell>
              <Table.RowHeaderCell>
                {numeral(semester).format("0o")} Semester
              </Table.RowHeaderCell>
              <Table.Cell>
                <Flex gap="2" justify="end">
                  <Link href={`/curriculum/${_id}`}>
                    <Button variant="surface">
                      <Pencil1Icon />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/curriculum/view/${_id}`}>
                    <Button color="gray" variant="surface">
                      <EyeOpenIcon />
                      View
                    </Button>
                  </Link>
                </Flex>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}

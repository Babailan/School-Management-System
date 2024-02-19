"use client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Heading, Table, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function Page() {
  const gradeLevels = [
    { title: "Grade 11 - Senior High School", value: "11" },
    { title: "Grade 12 - Senior High School", value: "12" },
  ];
  return (
    <Box className="space-y-5" p="6">
      <Heading>Tuition Fee</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {gradeLevels.map((gradelevel, idx) => (
            <Table.Row align={"center"} key={idx}>
              <Table.RowHeaderCell>{gradelevel.title}</Table.RowHeaderCell>
              <Table.Cell justify={"end"}>
                <Link href={`/tuition/${gradelevel.value}`}>
                  <Button className="hover:cursor-pointer">
                    <Pencil1Icon /> Edit
                  </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tabs,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import {
  Pencil1Icon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import { getStudentFeeSearchAction } from "@/actions/student-fee/get-student-fee";
import { SelectYear } from "@/components/select";
import { useState } from "react";
import Link from "next/link";
import numeral from "numeral";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { isPending, data } = useQuery({
    queryKey: ["student-fee", year],
    queryFn: async () => await getStudentFeeSearchAction("", 1, 10, year),
  });
  if (isPending) {
    return <Loading p="6" />;
  }
  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>Student Fee</Heading>
        <Text>Comprehensive List of Students Scheduled to be assess</Text>
      </Flex>
      <Box>
        <SelectYear onValueChange={(value) => setYear(value)} value={year} />
      </Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Middle Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Remaining Balance</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.results.map((student, idx) => {
            const tuition = Number(student.assessment.tuition);
            const remainingbalance =
              Number(student.assessment.tuition) -
              Number(student.assessment.balance ?? 0);

            const paidStatus = remainingbalance > 0;
            return (
              <Table.Row key={idx} align="center">
                <Table.RowHeaderCell>
                  <Text color={paidStatus ? "red" : "blue"}>
                    {paidStatus ? "Not Paid" : "Paid"}
                  </Text>
                </Table.RowHeaderCell>
                <Table.RowHeaderCell>{student.firstName}</Table.RowHeaderCell>
                <Table.Cell>{student.lastName}</Table.Cell>
                <Table.Cell>{student.middleName}</Table.Cell>
                <Table.Cell>
                  <Text className={paidStatus ? "" : "line-through"}>
                    ₱{numeral(remainingbalance).format(",")}
                  </Text>
                </Table.Cell>
                <Table.Cell justify="end">
                  <Link href={`/student-fee/manage/${student._id}`}>
                    <Button variant="surface">Manage</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

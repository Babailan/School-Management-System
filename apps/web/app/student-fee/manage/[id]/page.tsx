"use client";

import { addStudentFeeAction } from "@/actions/student-fee/add-student-fee";
import { getStudentFeeById } from "@/actions/student-fee/get-student-fee";
import Loading from "@/app/loading";
import { ExclamationTriangleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  Strong,
  Table,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import numeral from "numeral";
import AddFee from "./addFee";

export default function Page() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["student-fee manage", id],
    queryFn: async () => await getStudentFeeById(id as string),
  });
  if (isPending) {
    return <Loading disablePadding></Loading>;
  }
  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>Student Fee</Heading>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
      </Flex>
      <Card>
        <Flex direction="column">
          <Text weight="medium">{data.fullName}</Text>
          <Text size="1" className="capitalize">
            {data.sex}
          </Text>
        </Flex>
      </Card>
      <Callout.Root color="red" variant="surface">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          <Strong>Note :</Strong> When you deposit a money, it will be added to
          the student's account immediately so be careful.
        </Callout.Text>
      </Callout.Root>
      <Flex>
        <Badge>Fully Paid</Badge>
      </Flex>
      <Flex direction="column">
        {data.assessment.map((assessment, idx) => {
          return (
            <Flex key={idx} direction="column">
              <Heading size={"4"}>
                Tuition {assessment.year} - {Number(assessment.year) + 1}
              </Heading>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Tuition Fee</Table.RowHeaderCell>
                    <Table.Cell>
                      {numeral(assessment.tuition).format(",")}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell colSpan={2}>
                      <Text weight="medium" color="gray">
                        Paid Amount: ₱
                        {numeral(assessment.balance ?? 0).format(",")}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell colSpan={2}>
                      <Text weight="bold">
                        Total Payment: ₱
                        {numeral(
                          assessment.tuition - (assessment.balance ?? 0)
                        ).format(",.00")}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
              <AddFee id={id} year={assessment.year} />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

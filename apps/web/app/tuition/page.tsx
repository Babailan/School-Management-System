"use client";
import { getTuitionAction } from "@/actions/tuition/get-tuition";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "../loading";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["tuitionlist"],
    queryFn: async () => await getTuitionAction(),
  });
  if (isPending) {
    return <Loading p="6" />;
  }
  console.log(data);
  return (
    <Box className="space-y-5" p="6">
      <Flex justify="between" align="center">
        <Flex direction="column">
          <Heading>Tuition Fee</Heading>
          <Text color="gray">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Text>
        </Flex>
        <Link href={"/tuition/add"}>
          <Button variant="ghost">Add Tuition</Button>
        </Link>
      </Flex>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Tuition Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((tuition, idx) => {
            return (
              <Table.Row key={idx} align={"center"}>
                <Table.Cell>{tuition.tuition_title}</Table.Cell>
                <Table.Cell>₱{tuition.amount}</Table.Cell>
                <Table.Cell justify={"end"}>
                  <Link href={`/tuition/`}>
                    <Button className="hover:cursor-pointer">
                      <Pencil1Icon /> Edit
                    </Button>
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

"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  Link,
  Separator,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import numeral from "numeral";
import { useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { $Assessment } from "@repo/types";
import { z } from "zod";
import dateFormat from "dateformat";

export default function Page() {
  const params = useSearchParams();
  const _id = params.get("_id");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["assessment/assess", _id],
    queryFn: async () =>
      $Assessment.parse(
        (await axios.get(`http://localhost:3001/api/assessment/${_id}`)).data
      ),
  });

  if (isPending) {
    return (
      <Box p={"6"}>
        <Skeleton height={40}></Skeleton>
        <Skeleton height={500}></Skeleton>
        <Skeleton height={50}></Skeleton>
      </Box>
    );
  }

  const miscellaneousTotal = numeral(
    data?.miscellaneous?.reduce((p, c) => Number(p) + Number(c.fee), 0) || 0
  ).format("0,0");
  const tuitionFormatted = numeral(data?.tuition || 0).format("0,0");
  const remainingBalance = numeral(
    (numeral(miscellaneousTotal).value() || 0) +
      Number(data?.tuition || 0) -
      (data?.balance || 0)
  ).format("0,0");

  const paidBalance = numeral(data?.balance || 0).format("0,0");
  return (
    <Box p="6" className="space-y-5">
      <Box>
        <Heading>Assessment</Heading>
        <Text size="2" color="gray">
          Make sure all the information provided is correct.
        </Text>
      </Box>
      <Card style={{ maxWidth: 240 }}>
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            radius="full"
            fallback={data?.fullname.at(0) || ""}
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {data?.fullname}
            </Text>
            <Text as="div" size="2" color="gray">
              {data?.sex.toUpperCase()}
            </Text>
          </Box>
        </Flex>
      </Card>
      <Flex justify="between" align={"center"}>
        <Flex gap={"2"} className="uppercase">
          <Badge color={data?.status == "paid" ? "indigo" : "red"}>
            Status : {data?.status || "not paid"}
          </Badge>
          <Badge color={data?.enroll == "enrolled" ? "indigo" : "red"}>
            Status : {data?.enroll || "not enroll"}
          </Badge>
          <Badge color="gray">
            YEAR : {`${data?.year} - ${Number(data?.year) + 1}`}
          </Badge>
          <Badge color="gray">STRAND : {data?.strand}</Badge>
          <Badge color="gray">Grade Level : {data?.gradeLevel}</Badge>
        </Flex>
        <Box>
          <History history={data?.history} />
        </Box>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Miscellaneous</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="capitalize">
          {data?.miscellaneous?.map((misc, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>{misc.name}</Table.Cell>
              <Table.Cell>₱{misc.fee}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box className="space-y-2">
        <Text as="div" color="gray" size={"2"}>
          Miscellaneous : ₱ {miscellaneousTotal}
        </Text>
        <Text as="div" color="gray" size={"2"}>
          Tuition Fee : ₱ {tuitionFormatted}
        </Text>
        <Separator orientation="horizontal" size={"4"}></Separator>
        <Text as="div">Remaining Balance : ₱ {remainingBalance}</Text>
        <Text as="div">Paid Balance : ₱ {paidBalance}</Text>
      </Box>
      <Box>
        <Deposit _id={_id} refetch={refetch} />
      </Box>
    </Box>
  );
}
const History: React.FC<{
  history: z.infer<typeof $Assessment.shape.history>;
}> = ({ history }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Link>History</Link>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Deposit History</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          All Deposit History are listed here.
        </Dialog.Description>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {history?.toReversed().map(({ amount, date }, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.RowHeaderCell>
                    ₱ {numeral(amount).format("0,0")}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {dateFormat(date, "mmmm dS, yyyy, h:MM:ss TT")}
                  </Table.Cell>
                </Table.Row>
              );
            }) || (
              <Table.Row>
                <Table.Cell colSpan={2} align="center">
                  <Text>This account has no history.</Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

const Deposit = ({ _id, refetch }) => {
  const [deposit, setDeposit] = useState(0);
  const confirm = async () => {
    await toast.promise(
      axios.put("http://localhost:3001/api/assessment/add-balance", {
        balance: deposit,
        _id,
      }),
      {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
    refetch();
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Deposit</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Deposit to account</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make sure to the amount is correct.
        </Dialog.Description>

        <Flex>
          <TextField.Input
            type="number"
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          ></TextField.Input>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={confirm}>Confirm</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

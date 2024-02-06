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
  TextField,
} from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import PesoSign from "../../../icon/peso";
import numeral from "numeral";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import PesoInput from "../../../components/input/pesoinput";

export default function Page() {
  const params = useParams();
  const [tuition, setTuition] = useState("");
  const [miscellaneous, setMiscellaneous] = useState<any[]>([]);

  const [newMiscellenous, setNewMiscellenous] = useState({
    name: "",
    fee: "",
  });

  useEffect(() => {}, []);

  return (
    <Box className="space-y-5">
      <Heading>Edit Tuition Page</Heading>
      <Text>Adjust the tuition fee for Grade {params.edit}</Text>
      <Box>
        <Text size={"3"} weight={"medium"}>
          Tuition Fee
        </Text>
        <PesoInput
          onChange={(e) => setTuition(e.target.value)}
          value={tuition}
          size={"2"}
        />
      </Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Miscellaneous Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {miscellaneous.map((misc, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.RowHeaderCell>{misc.name}</Table.RowHeaderCell>
                <Table.Cell>₱{misc.fee}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            );
          })}

          {!!miscellaneous.length || (
            <Table.Row>
              <Table.RowHeaderCell align="center" colSpan={3}>
                No Miscellenous Fee
              </Table.RowHeaderCell>
            </Table.Row>
          )}

          <Table.Row align={"center"}>
            <Table.RowHeaderCell></Table.RowHeaderCell>
            <Table.Cell></Table.Cell>
            <Table.Cell justify={"end"}>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Box>
                    <Button className="hover:cursor-pointer">
                      <PlusIcon /> Add
                    </Button>
                  </Box>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                  <Dialog.Title>Edit profile</Dialog.Title>
                  <Dialog.Description size="2" mb="4">
                    Make changes to your profile.
                  </Dialog.Description>
                  <Flex direction={"column"} gap={"2"}>
                    <Box>
                      <Text as="label" size={"2"}>
                        Miscellaneous Name
                      </Text>
                      <TextField.Input
                        onChange={(e) =>
                          setNewMiscellenous((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                      ></TextField.Input>
                    </Box>
                    <Box>
                      <Text as="label" size={"2"}>
                        Fee
                      </Text>
                      <PesoInput
                        onChange={(e) =>
                          setNewMiscellenous((p) => ({
                            ...p,
                            fee: e.target.value,
                          }))
                        }
                      ></PesoInput>
                    </Box>
                  </Flex>

                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Box>
                        <Button
                          className="hover:cursor-pointer"
                          variant="soft"
                          color="gray"
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Box>
                        <Button
                          className="hover:cursor-pointer"
                          onClick={() =>
                            setMiscellaneous([
                              ...miscellaneous,
                              newMiscellenous,
                            ])
                          }
                        >
                          Save
                        </Button>
                      </Box>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <Box>
        <Text as="div" size="2" color="gray">
          Tuition Fee : {tuition}
        </Text>
        <Text as="div" size="2" color="gray">
          Miscellaneous Fee :{" "}
          {miscellaneous.reduce((p, c) => p + Number(c.fee), 0)}
        </Text>

        <Text size="3">
          <Strong>
            Total :{" "}
            {numeral(
              miscellaneous.reduce((p, c) => p + Number(c.fee), 0) +
                Number(tuition)
            ).format()}
          </Strong>
        </Text>
      </Box>
      <Box>
        <Button color="green" className="hover:cursor-pointer">
          <CheckIcon width={"20"} height={"20"} />
          Update Tuition Fee
        </Button>
      </Box>
    </Box>
  );
}

"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Text,
} from "@radix-ui/themes";

export default function AccessControlPage() {
  return (
    <Box p="6" className="space-y-5">
      <Flex wrap={"wrap"} align="center" justify="between">
        <Box>
          <Heading>Access Control</Heading>
          <Text color="gray">
            This page is only accessible to the admin user. If you think this is
            a mistake, please contact the administrator.
          </Text>
        </Box>
        <Box>
          <Button>
            <PlusCircledIcon />
            Create User
          </Button>
        </Box>
      </Flex>
      <Flex direction="column">
        <Text>Role</Text>
        <Select.Root defaultValue="all">
          <Select.Trigger></Select.Trigger>
          <Select.Content position="popper">
            <Select.Item value="all">All</Select.Item>
            <Select.Item value="administrator">Administrator</Select.Item>
            <Select.Item value="faculty">Faculty</Select.Item>
            <Select.Item value="registrar">Registrar</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
              <Table.Cell>danilo@example.com</Table.Cell>
              <Table.Cell>Developer</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
              <Table.Cell>zahra@example.com</Table.Cell>
              <Table.Cell>Admin</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
              <Table.Cell>jasper@example.com</Table.Cell>
              <Table.Cell>Developer</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

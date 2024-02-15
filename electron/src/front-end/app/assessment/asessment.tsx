import { Box, Heading, Table, Text } from "@radix-ui/themes";

export default function AssessmentList() {
  return (
    <Box className="space-y-2">
      <Box>
        <Text size={"3"} weight={"bold"} as="div">
          Assessment List
        </Text>
        <Text size={"2"} color="gray">
          List of available of student to be assess
        </Text>
      </Box>
      <Box py={"2"}>
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
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

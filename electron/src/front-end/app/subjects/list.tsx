import {
  CheckIcon,
  Cross1Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Heading,
  Text,
  TextField,
  AlertDialog,
  Button,
  Flex,
  Strong,
  Table,
  Tabs,
} from "@radix-ui/themes";
import { useState } from "react";
import Pagination from "../../components/pagination/pagination";
import { useQuery } from "@tanstack/react-query";
import { SearchSubject } from "../../fetch/subject/search-subject";

export default function ListSubjectPage() {
  const [page, setPage] = useState(1);
  const { isPending, data, isError } = useQuery({
    queryKey: ["subject", page],
    queryFn: () => SearchSubject("", page),
  });

  if (isPending) {
    return <Heading>HELLo</Heading>;
  }
  if (isError) {
    return <Heading>Something went wrong</Heading>;
  }
  return (
    <Flex direction={"column"} gap={"2"} p={"3"}>
      <Text size="3" weight={"bold"}>
        List of Subject
      </Text>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.data.documents.map(({ subjectCode, subjectName }, idx) => {
            return (
              <Table.Row key={idx} align={"center"}>
                <Table.RowHeaderCell>{subjectCode}</Table.RowHeaderCell>
                <Table.Cell className="whitespace-nowrap">
                  {subjectName}
                </Table.Cell>
                <Table.Cell justify={"end"}>
                  <Box className="space-x-2 whitespace-nowrap">
                    <Button className="hover:cursor-pointer">
                      <Pencil1Icon /> Edit
                    </Button>
                    <Button color="red" className="hover:cursor-pointer">
                      <TrashIcon /> Delete
                    </Button>
                  </Box>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination maxPage={data.data.maxPage} page={page} setPage={setPage} />
    </Flex>
  );
}

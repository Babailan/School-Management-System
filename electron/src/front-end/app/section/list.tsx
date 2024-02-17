import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function SectionList() {
  const { data, isPending } = useQuery({
    queryKey: ["section-list-page"],
    queryFn: async () =>
      (
        await axios.get("http://localhost:3001/api/section", {
          params: {
            limit: 0,
          },
        })
      ).data,
  });
  if (isPending) {
    return (
      <Box>
        <Skeleton height={30}></Skeleton>
        <Skeleton height={500}></Skeleton>
        <Skeleton height={50}></Skeleton>
      </Box>
    );
  }

  return (
    <Box className="space-y-4">
      <Box>
        <Text size="3" weight={"bold"} as="div">
          Section List
        </Text>
        <Text size={"2"} color="gray">
          List of available of section
        </Text>
      </Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Section Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Academic Strand</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.results.map(({ _id, gradeLevel, strand, sectionName }) => (
            <Table.Row key={_id} className="font-medium">
              <Table.Cell>{sectionName}</Table.Cell>
              <Table.Cell>{gradeLevel}</Table.Cell>
              <Table.Cell>{strand}</Table.Cell>
              <Table.Cell justify="end">
                <Link href={`/section/${_id}`}>
                  <Button className="hover:cursor-pointer">
                    <Pencil1Icon />
                    Edit
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

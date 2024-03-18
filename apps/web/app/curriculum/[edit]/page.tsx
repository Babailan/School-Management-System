"use client";

import { GetCurriculumByIdAction } from "@/actions/curriculum/get-curriculum";
import Loading from "@/app/loading";
import { Strand } from "@/lib/helpers/strand";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { edit } = useParams();
  const { data, isPending, error } = useQuery({
    queryFn: async () => await GetCurriculumByIdAction(edit as string),
    queryKey: ["curriculum", edit],
  });

  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  return (
    <Box p="6">
      <Flex direction="column">
        <Heading>
          Curriculum {data.year} - {Number(data.year) + 1}
        </Heading>
        <Text size="2" color="gray">
          Editing a curriculum for {data.year} - {Number(data.year) + 1}
        </Text>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Strand</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.entries(Strand).map((strand, idx) => {
            return (
              <Table.Row align="center" key={idx}>
                <Table.Cell>{strand["1"]}</Table.Cell>
                <Table.Cell justify="end">
                  <Link href={`/curriculum/${edit}/${strand[0]}`}>
                    <Button className="hover:cursor-pointer">
                      <Pencil1Icon />
                      Edit Subject
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

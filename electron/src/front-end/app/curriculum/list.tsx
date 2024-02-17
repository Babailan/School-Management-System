"use client";

import { Box, Button, Table, Text } from "@radix-ui/themes";
import SelectYear from "../../components/select/year";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function CurriculumList() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { data, isPending } = useQuery({
    queryKey: ["curriculum-list"],
    queryFn: () => axios.get("http://localhost:3001/api/curriculum"),
  });

  if (isPending) {
    return (
      <Box>
        <Skeleton height={40}></Skeleton>
        <Skeleton height={500}></Skeleton>
        <Skeleton height={40} width={350}></Skeleton>
      </Box>
    );
  }
  return (
    <Box>
      <Box>
        <Text size={"3"} weight={"bold"}>
          List of Curriculum
        </Text>
      </Box>
      <Box>
        <SelectYear
          onValueChange={(year) => setYear(year)}
          defaultValue={year}
        />
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Curriculum Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.data
              .filter((p) => p.year == year)
              .map(({ _id, gradeLevel }) => {
                return (
                  <Table.Row key={_id} align={"center"}>
                    <Table.RowHeaderCell>
                      Grade {gradeLevel} Senior High
                    </Table.RowHeaderCell>
                    <Table.Cell justify={"end"}>
                      <Link href={`/curriculum/${_id}`}>
                        <Button>
                          <Pencil1Icon />
                          Edit
                        </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

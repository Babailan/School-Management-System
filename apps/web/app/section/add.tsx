import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  SelectGradeLevel,
  SelectSemester,
  SelectStrand,
  SelectYear,
} from "../../components/select";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { CheckIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

export default function SectionAdd() {
  const { data } = useQuery({
    queryKey: ["curriculum-list"],
    queryFn: async () =>
      (await axios.get("http://localhost:3001/api/curriculum")).data,
  });

  const [strand, setStrand] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [sectionName, setSectionName] = useState("");

  const subjects = _.get(
    _.find(data, (o) => o.year == year && o.gradeLevel == gradeLevel),
    `semester.${semester}.${strand}.subjects`,
    []
  );

  return (
    <Box className="space-y-5">
      <Box>
        <Text size={"3"} weight={"bold"}>
          Section Information
        </Text>
      </Box>
      <Box className="space-y-2">
        <Flex align={"center"} gap={"2"}>
          <Label className="text-sm">Year</Label>
          <SelectYear onValueChange={(value) => setYear(value)} />
        </Flex>
        <SelectStrand onValueChange={(value) => setStrand(value)} />
        <SelectSemester onValueChange={(value) => setSemester(value)} />
        <SelectGradeLevel onValueChange={(value) => setGradeLevel(value)} />
        <Box>
          <Text size={"2"}>Section name</Text>
          <TextField.Input
            onChange={(e) => setSectionName(e.target.value)}
          ></TextField.Input>
        </Box>
        <Text mt={"2"} as="div" weight={"bold"} size={"3"}>
          Subject List
        </Text>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {subjects.map((sub) => (
              <Table.Row className="uppercase" key={sub._id}>
                <Table.RowHeaderCell>{sub.subjectCode}</Table.RowHeaderCell>
                <Table.Cell>{sub.subjectName}</Table.Cell>
              </Table.Row>
            ))}
            {!!subjects.length || (
              <Table.Row className="uppercase text-center">
                <Table.RowHeaderCell colSpan={2}>
                  Subjects is empty
                </Table.RowHeaderCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
      <Box>
        <Button
          onClick={async () => {
            toast.promise(
              axios.post("http://localhost:3001/api/section", {
                data: {
                  subjects: subjects,
                  gradeLevel,
                  year,
                  sectionName,
                  strand,
                  semester,
                },
              }),
              {
                loading: "Saving...",
                success: <b>Settings saved!</b>,
                error: ({ response }) => {
                  if (response.status == 403) {
                    const data = response.data;
                    return <b>{_.head<any>(data).message}</b>;
                  }
                  return <b>Something went wrong</b>;
                },
              }
            );
          }}
        >
          <CheckIcon />
          Confirm
        </Button>
      </Box>
    </Box>
  );
}

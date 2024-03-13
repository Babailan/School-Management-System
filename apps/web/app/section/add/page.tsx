"use client";

import {
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  Separator,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { SelectYear } from "@/components/select";
import { useState } from "react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { Strand } from "@/libs/helpers/strand";
import { GetCurriculumByFilter } from "@/actions/curriculum/get-curriculum";
import Loading from "@/app/loading";
import { addSectionAction } from "@/actions/section/add-section";
import { toast } from "react-toastify";

function CurriculumTable({
  data,
  selectedCurriculum,
  selectedStrand,
  onSelect,
  isPending,
}) {
  if (isPending) {
    return <Loading />;
  }
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Curriculum Strand</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Semester</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.length === 0 && (
          <Table.Row align="center">
            <Table.Cell colSpan={4} justify="center">
              <Text weight={"medium"}>No available Curriculum</Text>
            </Table.Cell>
          </Table.Row>
        )}
        {data?.map((curriculum) => {
          console.log(curriculum);
          return Object.keys(Strand).map((strand, idx) => {
            const isSelected = selectedCurriculum
              ? selectedCurriculum?.id === curriculum.id &&
                selectedStrand === strand &&
                selectedCurriculum.semester == curriculum.semester
              : false;
            if (!curriculum?.[strand] || curriculum?.[strand].length === 0)
              return null;

            return (
              <Table.Row align="center" key={idx}>
                <Table.RowHeaderCell>{strand}</Table.RowHeaderCell>
                <Table.Cell>{curriculum.gradeLevel}</Table.Cell>
                <Table.Cell>{curriculum.semester}</Table.Cell>
                <Table.Cell justify="end">
                  <Button
                    variant="soft"
                    disabled={isSelected}
                    onClick={() => {
                      onSelect(curriculum, strand);
                    }}
                  >
                    Select Curriculum
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          });
        })}
      </Table.Body>
    </Table.Root>
  );
}

function SubjectTable({ strand, curriculum }) {
  if (!curriculum || !strand) return null;
  return (
    <>
      <Callout.Root color="yellow" variant="surface">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          The following are the subjects for the selected curriculum and strand.
        </Callout.Text>
      </Callout.Root>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {curriculum[strand].map(({ subjectCode, subjectName }, idx) => {
            return (
              <Table.Row className="uppercase" align="center" key={idx}>
                <Table.Cell>{subjectCode}</Table.Cell>
                <Table.Cell>{subjectName}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
}

export default function SectionAdd() {
  const [year, setYear] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState<any>();
  const [selectedStrand, setSelectedStrand] = useState<any>();
  const { data, isPending } = useQuery({
    queryKey: ["curriculum-list", year],
    queryFn: async () => await GetCurriculumByFilter({ year }),
  });

  const handleCurriculumSelect = (curriculum, strand) => {
    setSelectedCurriculum(curriculum);
    setSelectedStrand(strand);
  };

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("sectionName", sectionName);
    formdata.append("curriculumID", selectedCurriculum?._id);
    formdata.append("strand", selectedStrand);

    const toastID = toast.loading("Please wait...");
    const result = await addSectionAction(formdata);
    if (result.success) {
      toast.update(toastID, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      toast.update(toastID, {
        render: result.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <Box p={"6"} className="space-y-5">
      <Box>
        <Heading>Section Information</Heading>
        <Text size={"2"} color="gray">
          List of available sections in the school
        </Text>
      </Box>

      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Please select the curriculum for the section you are adding.
        </Callout.Text>
      </Callout.Root>
      <Box className="space-y-2">
        <Box>
          <Flex direction="column">
            <Text size="2">Curriculum Year</Text>
            <SelectYear name="year" onValueChange={(e) => setYear(e)} />
          </Flex>

          <Flex direction="column">
            <Text size={"2"}>Section name</Text>
            <TextField.Input
              onChange={(e) => setSectionName(e.target.value)}
              disabled={year ? false : true}
            ></TextField.Input>
          </Flex>
        </Box>

        <CurriculumTable
          data={data}
          selectedCurriculum={selectedCurriculum}
          selectedStrand={selectedStrand}
          onSelect={handleCurriculumSelect}
          isPending={isPending}
        />

        <Box py="5">
          <Separator size={"4"} />
        </Box>

        <SubjectTable curriculum={selectedCurriculum} strand={selectedStrand} />
      </Box>
      <Box>
        <Button onClick={submit}>
          <CheckIcon />
          Confirm
        </Button>
      </Box>
    </Box>
  );
}

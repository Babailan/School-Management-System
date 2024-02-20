"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Table,
  Text,
  Separator,
  Link as RadixLink,
  Dialog,
  Inset,
  TableBody,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import _ from "lodash";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { $Assessment, $Section } from "@repo/types";
import { z } from "zod";
import Link from "next/link";

export default function Page() {
  const params = useSearchParams();
  const _id = params.get("_id");
  const [selectedSectionID, setSelectedSectionID] = useState("");

  const { data: AssessmentData, isPending: AssessmentPending } = useQuery({
    queryKey: ["/assessment/enrollment", _id],
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/api/assessment/${_id}`)).data,
  });

  const assessment = $Assessment.optional().parse(AssessmentData);

  const { data: SectionData, isPending: SectionPending } = useQuery({
    queryKey: ["/assessment/enrollment", _id, "for-section"],
    queryFn: async () =>
      (
        await axios.get(`http://localhost:3001/api/section`, {
          params: {
            year: assessment?.year,
            gradeLevel: assessment?.gradeLevel,
            strand: assessment?.strand,
          },
        })
      ).data,
    enabled: !!assessment,
  });

  const sections = z
    .array($Section.extend({ _id: z.string() }))
    .default([])
    .parse(SectionData);

  const enrolledSection = sections.filter((sections) =>
    sections.students?.some(
      (student) => student.studentId == assessment?.studentId
    )
  );

  const selectedSubjects = _.get(
    _.find(sections, { _id: selectedSectionID }),
    "subjects",
    []
  );

  const enroll = () => {
    return () => {
      toast.promise(
        axios.put("http://localhost:3001/api/assessment/enroll", {
          _id: _id,
          section_id: selectedSectionID,
        }),
        {
          loading: "Saving...",
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        }
      );
    };
  };
  if (AssessmentPending || SectionPending) {
    return (
      <Box p={"6"}>
        <Skeleton height={40}></Skeleton>
        <Skeleton height={500}></Skeleton>
        <Skeleton height={50}></Skeleton>
      </Box>
    );
  }

  return (
    <Box p="6" className="space-y-5">
      <Box>
        <Heading>Enrollment</Heading>
        <Text size="2" color="gray">
          Make sure all the information provided is correct.
        </Text>
      </Box>
      <Card style={{ maxWidth: 240 }}>
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            radius="full"
            fallback={assessment?.fullname.at(0) || ""}
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {assessment?.fullname}
            </Text>
            <Text as="div" size="2" color="gray">
              {assessment?.sex.toUpperCase()}
            </Text>
          </Box>
        </Flex>
      </Card>
      <Flex
        gap={"2"}
        className="uppercase"
        justify={"between"}
        align={"center"}
      >
        <Box className="space-x-2">
          <Badge color={assessment?.assessment_status ? "indigo" : "red"}>
            Status : {assessment?.assessment_status ? "Paid" : "Not Paid"}
          </Badge>
          <Badge color={assessment?.enrollment_status ? "indigo" : "red"}>
            Status : {assessment?.enrollment_status ? "Enrolled" : "Not Enroll"}
          </Badge>
          <Badge color="gray">
            YEAR : {`${assessment?.year} - ${Number(assessment?.year) + 1}`}
          </Badge>
          <Badge color="gray">STRAND : {assessment?.strand}</Badge>
          <Badge color="gray">Grade Level : {assessment?.gradeLevel}</Badge>
        </Box>
        <Box>
          {!enrolledSection.length || (
            <Dialog.Root>
              <Dialog.Trigger>
                <RadixLink size="2">View Section</RadixLink>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Title>Section List</Dialog.Title>
                <Dialog.Description>
                  The student is currently registered in the following section.
                </Dialog.Description>
                <Inset side="x" my="5">
                  <Table.Root>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>
                          Section Name
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <TableBody>
                      {enrolledSection.map((section) => (
                        <Table.Row key={section._id} align={"center"}>
                          <Table.Cell>{section.sectionName}</Table.Cell>
                          <Table.Cell justify={"end"}>
                            <Link href={"#"}>
                              <Button className="hover:cursor-pointer">
                                View Section
                              </Button>
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </TableBody>
                  </Table.Root>
                </Inset>

                <Flex gap="3" justify="end">
                  <Dialog.Close>
                    <Button
                      variant="soft"
                      color="gray"
                      className="hover:cursor-pointer"
                    >
                      Close
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          )}
        </Box>
      </Flex>
      <Separator orientation="horizontal" size={"4"} />

      <Select.Root onValueChange={(_id) => setSelectedSectionID(_id)}>
        <Select.Trigger placeholder="Pick a section" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Pick a section</Select.Label>
            {sections?.map((section, idx) => (
              <Select.Item value={section._id} key={section._id}>
                {section.sectionName}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Box>
        {selectedSectionID ? (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Subject Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Subject Code</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {selectedSubjects.map((subject, idx) => (
                <Table.Row className="uppercase" key={idx}>
                  <Table.Cell>{subject.subjectName}</Table.Cell>
                  <Table.Cell>{subject.subjectCode}</Table.Cell>
                </Table.Row>
              ))}
              {!!selectedSubjects.length || (
                <Table.Row>
                  <Table.Cell colSpan={2} align="center">
                    <Text>This section has no subjects entries.</Text>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        ) : null}
      </Box>
      <Box>
        <Button className="hover:cursor-pointer" onClick={enroll}>
          <PlusCircledIcon />
          Enroll
        </Button>
      </Box>
    </Box>
  );
}

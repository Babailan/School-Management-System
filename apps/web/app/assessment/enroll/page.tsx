"use client";

import { PlusCircledIcon, SectionIcon } from "@radix-ui/react-icons";
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

export default function Page() {
  const params = useSearchParams();
  const _id = params.get("_id");
  // ID OF section
  const [selectedSectionID, setSelectedSectionID] = useState("");

  const { data: AssessmentData, isPending: AssessmentPending } = useQuery({
    queryKey: ["/assessment/enrollment", _id],
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/api/assessment/${_id}`)).data,
  });

  const assessment = $Assessment.nullish().parse(AssessmentData);

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
    .array(
      $Section.extend({ _id: z.string() }).partial().required({ _id: true })
    )
    .default([])
    .parse(SectionData);

  const selectedSubjects = _.get(
    _.find(sections, { _id: selectedSectionID }),
    "subjects",
    []
  );

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

      <Flex gap={"2"} className="uppercase" wrap="wrap">
        <Badge color={assessment?.status == "paid" ? "indigo" : "red"}>
          Status : {assessment?.status || "not paid"}
        </Badge>
        <Badge color={assessment?.enroll == "enrolled" ? "indigo" : "red"}>
          Status : {assessment?.enroll || "not enroll"}
        </Badge>
        <Badge color="gray">
          YEAR : {`${assessment?.year} - ${Number(assessment?.year) + 1}`}
        </Badge>
        <Badge color="gray">STRAND : {assessment?.strand}</Badge>
        <Badge color="gray">Grade Level : {assessment?.gradeLevel}</Badge>
      </Flex>
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
        <Button
          className="hover:cursor-pointer"
          onClick={() => {
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
          }}
        >
          <PlusCircledIcon />
          Enroll
        </Button>
      </Box>
    </Box>
  );
}

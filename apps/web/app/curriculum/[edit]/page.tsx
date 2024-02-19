"use client";

import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Dialog,
  DialogTrigger,
  Flex,
  Table,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import numeral from "numeral";
import NotFound from "../../not-found";
import { useEffect, useState } from "react";
import SelectSubject from "../../../components/select/subject";
import { SelectSemester, SelectStrand } from "../../../components/select";
import toast from "react-hot-toast";
import _ from "lodash";

export default function Page() {
  const { edit } = useParams();
  const [curriculum, setCurriculum] = useState<any>(null);
  const { data, isError, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["curriculum", edit],
    queryFn: async () =>
      (await axios.get(`http://localhost:3001/api/curriculum/${edit}`)).data,
  });
  useEffect(() => {
    if (isSuccess) {
      setCurriculum(data);
    }
  }, [isSuccess]);

  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [selectedSemester, setSelectedSemester] = useState<any>("");
  const [selectedStrand, setSelectedStrand] = useState<any>("");

  const updateSubject = async () => {
    toast.promise(
      axios.put(`http://localhost:3001/api/curriculum/${curriculum._id}`, {
        data: curriculum,
        id: curriculum._id,
      }),
      {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
  };
  const addSubject = () => {
    if (!selectedSemester || !selectedStrand || !selectedSubject) {
      return toast.error("All inputs are required");
    }
    const updatedCurriculum = { ...curriculum };
    const strandSubjects = _.get(
      updatedCurriculum,
      `semester.${selectedSemester}.${selectedStrand}.subjects`
    );

    if (strandSubjects) {
      const selectedSubjectExist = strandSubjects.some(
        (subject) => selectedSubject._id === subject._id
      );
      if (selectedSubjectExist) {
        // Set to default values
        setSelectedSubject(null);
        setSelectedSemester("");
        setSelectedStrand("");
        return toast.error("Selected Subject already exists");
      }
      _.setWith(
        updatedCurriculum,
        `semester.${selectedSemester}.${selectedStrand}.subjects`,
        [...strandSubjects, selectedSubject],
        Object
      );
    } else {
      _.setWith(
        updatedCurriculum,
        `semester.${selectedSemester}.${selectedStrand}.subjects`,
        [selectedSubject],
        Object
      );
    }

    setCurriculum(updatedCurriculum);

    // // Set to default values
    setSelectedSubject(null);
    setSelectedSemester("");
    setSelectedStrand("");
  };

  const removeSpecificSubject = (semester, strand, subject_id) => {
    const subjects = _.get(
      curriculum,
      `semester.${semester}.${strand}.subjects`
    );
    const removedArray = _.filter(subjects, (s) => s._id != subject_id);
    _.set(curriculum, `semester.${semester}.${strand}.subjects`, removedArray);
    setCurriculum({ ...curriculum });
  };

  if (isPending) {
    return (
      <Box className="space-y-5">
        <div className="w-full h-8 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-screen bg-gray-300 rounded-md animate-pulse"></div>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <NotFound />
      </Box>
    );
  }

  if (curriculum && isSuccess) {
    return (
      <Box p="6">
        <Flex justify={"between"}>
          <Box>
            <Text size="4" weight="bold">
              Editing Curriculum {curriculum.year}
            </Text>
            <Text size="2" color="gray" as="div">
              Grade {curriculum.gradeLevel} Senior High
            </Text>
          </Box>
          <Box>
            <Dialog.Root>
              <DialogTrigger>
                <Box>
                  <Button>
                    <PlusIcon />
                    Add Subject
                  </Button>
                </Box>
              </DialogTrigger>

              <Dialog.Content>
                <Dialog.Title>Add Subject</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Make changes to your curriculum.
                </Dialog.Description>
                <Box className="space-y-2">
                  <SelectStrand onValueChange={(v) => setSelectedStrand(v)} />
                  <SelectSemester
                    onValueChange={(v) => setSelectedSemester(v)}
                  />
                  <SelectSubject
                    onClick={(subject) => {
                      setSelectedSubject(subject);
                    }}
                  />
                  {!selectedSubject || (
                    <Text size={"2"} weight={"medium"} as="div">
                      Selected Subject : {selectedSubject?.subjectCode} |{" "}
                      {selectedSubject?.subjectName}
                    </Text>
                  )}
                </Box>
                <Flex justify={"end"}>
                  <Dialog.Close>
                    <Box>
                      <Button onClick={addSubject}>Confirm</Button>
                    </Box>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </Box>
        </Flex>
        {curriculum ? (
          <Box className="space-y-5">
            {Object.keys(curriculum.semester || {}).map((semester) => {
              return (
                <Box key={semester}>
                  <Text as="div" align={"center"} size={"3"} weight={"bold"}>
                    {numeral(semester).format("0o")} Semester
                  </Text>
                  {Object.keys(curriculum.semester[semester]).map((strand) => {
                    return (
                      <Box key={strand} className="space-y-2" mt={"2"}>
                        <Text as="div" size={"2"} weight={"bold"}>
                          {strand} Strand
                        </Text>
                        <Table.Root variant="surface">
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeaderCell>
                                Subject Name
                              </Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell>
                                Subject Code
                              </Table.ColumnHeaderCell>
                              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                            </Table.Row>
                          </Table.Header>

                          <Table.Body>
                            {curriculum.semester[semester][strand].subjects.map(
                              (subject) => {
                                return (
                                  <Table.Row
                                    align={"center"}
                                    className="uppercase font-medium"
                                    key={subject._id}
                                  >
                                    <Table.Cell>
                                      {subject.subjectName}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {subject.subjectCode}
                                    </Table.Cell>
                                    <Table.Cell justify={"end"}>
                                      <Button
                                        color="red"
                                        onClick={() =>
                                          removeSpecificSubject(
                                            semester,
                                            strand,
                                            subject._id
                                          )
                                        }
                                      >
                                        <TrashIcon />
                                        Delete
                                      </Button>
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              }
                            )}
                          </Table.Body>
                        </Table.Root>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        ) : null}

        <Box py={"5"}>
          <Button onClick={updateSubject}>
            <Pencil1Icon /> Update Curriculum{" "}
          </Button>
        </Box>
      </Box>
    );
  }
}

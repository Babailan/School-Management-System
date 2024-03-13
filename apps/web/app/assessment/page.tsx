"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tabs,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import {
  Pencil1Icon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import Skeleton from "react-loading-skeleton";
import SearchInput from "../../components/input/search";
import { SelectLimit, SelectYear } from "../../components/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAssessmentSearchAction } from "@/actions/assessment/get-assessment";
import Loading from "../loading";

export default function Page() {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [limit, setLimit] = useState("10");
  const [searchInput, setSearchInput] = useState("");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["assessment-page", searchInput, page, year, limit],
    queryFn: async () =>
      await getAssessmentSearchAction(searchInput, page, Number(limit), year),
  });
  if (isPending) {
    return <Loading p="6" />;
  }

  return (
    <Box p="6">
      <Flex direction="column">
        <Heading>Assessment List</Heading>
        <Text>Comprehensive List of Students Scheduled to be assess</Text>
      </Flex>
      <Table.Root mt="5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Middle Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.results.map((student, idx) => {
            const paid = (student.balance ?? 0) >= student.tuition;

            return (
              <Table.Row key={idx} align="center">
                <Table.RowHeaderCell>
                  <Text color={paid ? "sky" : "red"}>
                    {paid ? "Paid" : "Not Paid"}
                  </Text>
                </Table.RowHeaderCell>
                <Table.Cell>{student.firstName}</Table.Cell>
                <Table.Cell>{student.lastName}</Table.Cell>
                <Table.Cell>{student.middleName}</Table.Cell>

                <Table.Cell>
                  <Flex justify={"end"} gap="4">
                    <Button>Add Balance</Button>
                    <Button>Enroll</Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
  // return (
  //   <Box className="space-y-2" p="6">
  //     <Box>
  //       <Text size={"3"} weight={"bold"} as="div">
  //         Assessment List
  //       </Text>
  //       <Text size={"2"} color="gray">
  //         Comprehensive List of Students Scheduled to be assess
  //       </Text>
  //     </Box>
  //     <Flex direction="column" gap={"2"}>
  //       <SelectYear onValueChange={(v) => setYear(v)} value={year} />
  //       <SelectLimit onValueChange={(v) => setLimit(v)} value={limit} />
  //     </Flex>
  //     <SearchInput
  //       onChange={(e) => setSearchInput(e.target.value)}
  //       size={"3"}
  //       placeholder="Search for verification"
  //     />
  //     <Box py={"2"}>
  //       {isPending ? (
  //         <Box>
  //           <Skeleton height={30}></Skeleton>
  //           <Skeleton height={400}></Skeleton>
  //         </Box>
  //       ) : (
  //         <Table.Root>
  //           <Table.Header>
  //             <Table.Row>
  //               <Table.ColumnHeaderCell>Payment Status</Table.ColumnHeaderCell>
  //               <Table.ColumnHeaderCell>
  //                 Enrollment Status
  //               </Table.ColumnHeaderCell>
  //               <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>

  //               <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
  //               <Table.ColumnHeaderCell>Strand</Table.ColumnHeaderCell>
  //               <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
  //             </Table.Row>
  //           </Table.Header>

  //           <Table.Body className="capitalize">
  //             {data?.results.length ? (
  //               data?.results.map((student) => {
  //                 return (
  //                   <Table.Row key={student._id} align={"center"}>
  //                     <Table.Cell>
  //                       <Text color={student.assessment_status ? "sky" : "red"}>
  //                         {student.assessment_status ? "Paid" : "Not Paid"}
  //                       </Text>
  //                     </Table.Cell>
  //                     <Table.Cell>
  //                       <Text color={student.enrollment_status ? "sky" : "red"}>
  //                         {student.enrollment_status || "Not Enrolled"}
  //                       </Text>
  //                     </Table.Cell>
  //                     <Table.Cell>{student?.fullname}</Table.Cell>
  //                     <Table.Cell>{student?.gradeLevel}</Table.Cell>
  //                     <Table.Cell>{student?.strand}</Table.Cell>
  //                     <Table.Cell>
  //                       <Flex gap={"2"} justify={"end"}>
  //                         <Tooltip
  //                           content={
  //                             "Clicking will redirect you to the Deposit Page for the assessment associated with the student."
  //                           }
  //                         >
  //                           <Link
  //                             href={`/assessment/assess?_id=${student?._id}`}
  //                           >
  //                             <Button className="hover:cursor-pointer">
  //                               <QuestionMarkCircledIcon />
  //                               Deposit
  //                             </Button>
  //                           </Link>
  //                         </Tooltip>
  //                         <Tooltip
  //                           content={
  //                             "Clicking will take you to the assessment page to enroll the student."
  //                           }
  //                         >
  //                           <Link
  //                             href={`/assessment/enroll?_id=${student?._id}`}
  //                           >
  //                             <Button
  //                               color="grass"
  //                               className="hover:cursor-pointer"
  //                             >
  //                               <PlusCircledIcon />
  //                               Enroll
  //                             </Button>
  //                           </Link>
  //                         </Tooltip>
  //                       </Flex>
  //                     </Table.Cell>
  //                   </Table.Row>
  //                 );
  //               })
  //             ) : (
  //               <Table.Row>
  //                 <Table.Cell
  //                   colSpan={5}
  //                   className="font-medium"
  //                   align="center"
  //                   justify={"center"}
  //                 >
  //                   No student verification found
  //                 </Table.Cell>
  //               </Table.Row>
  //             )}
  //           </Table.Body>
  //         </Table.Root>
  //       )}
  //     </Box>
  //   </Box>
  // );
}

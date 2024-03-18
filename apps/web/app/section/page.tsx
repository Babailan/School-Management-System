"use client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SelectYear } from "../../components/select";
import { useState } from "react";
import { GetSectionByFilterAction } from "@/actions/section/get-section";
import numeral from "numeral";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TypographyH3 } from "@/components/typography/h3";

function SectionList() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const { data, isPending } = useQuery({
    queryKey: ["section-list-page", year],
    queryFn: async () => await GetSectionByFilterAction({ year }),
  });

  console.log(data);
  return (
    <div className="space-y-5 p-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Section</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <div>
          <TypographyH3>Section List</TypographyH3>
        </div>
        <Box>
          <Link href={"/section/add"} legacyBehavior>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </Link>
        </Box>
      </div>
      <Flex direction={"column"} gap={"2"}>
        <SelectYear value={year} onValueChange={(v) => setYear(v)}></SelectYear>
      </Flex>
      {
        isPending ? <></> : <></>
        // <Table.Root>
        //   <Table.Header>
        //     <Table.Row>
        //       <Table.ColumnHeaderCell>Section Name</Table.ColumnHeaderCell>
        //       <Table.ColumnHeaderCell>Grade Level</Table.ColumnHeaderCell>
        //       <Table.ColumnHeaderCell>Academic Strand</Table.ColumnHeaderCell>
        //       <Table.ColumnHeaderCell>Semester</Table.ColumnHeaderCell>
        //       <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        //     </Table.Row>
        //   </Table.Header>

        //   <Table.Body>
        //     {data?.map(({ _id, gradeLevel, strand, sectionName, semester }) => (
        //       <Table.Row key={_id} className="font-medium" align={"center"}>
        //         <Table.Cell>{sectionName}</Table.Cell>
        //         <Table.Cell>{gradeLevel}</Table.Cell>
        //         <Table.Cell>{strand}</Table.Cell>
        //         <Table.Cell>
        //           {numeral(semester).format("0o")} Semester
        //         </Table.Cell>
        //         <Table.Cell justify="end">
        //           <Link href={`/section/edit/${_id}`}>
        //             <Button className="hover:cursor-pointer" variant="surface">
        //               <Pencil1Icon />
        //               Edit
        //             </Button>
        //           </Link>
        //         </Table.Cell>
        //       </Table.Row>
        //     ))}
        //     {!!data?.length || (
        //       <Table.Row className="font-medium">
        //         <Table.Cell colSpan={4} align="center">
        //           <Text>There is no section for this year.</Text>
        //         </Table.Cell>
        //       </Table.Row>
        //     )}
        //   </Table.Body>
        // </Table.Root>
      }
      <SetionTableList data={data} pending={true} />
    </div>
  );
}

const SetionTableList = ({ data, pending }) => {
  if (false) {
    return (
      <>
        <Skeleton className="h-screen" />
      </>
    );
  }
  return (
    <Table>
      <TableCaption>A list of school section here</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Section Name</TableHead>
          <TableHead>Grade Level</TableHead>
          <TableHead>Academic Strand</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(({ _id, gradeLevel, strand, sectionName, semester }) => (
          <TableRow key={_id} className="font-medium">
            <TableCell>{sectionName}</TableCell>
            <TableCell>{gradeLevel}</TableCell>
            <TableCell>{strand}</TableCell>
            <TableCell>{numeral(semester).format("0o")} Semester</TableCell>
            <TableCell className="text-right">
              <Link href={`/section/edit/${_id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SectionList;

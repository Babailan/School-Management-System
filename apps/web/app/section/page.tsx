"use client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SelectYear } from "../../components/select";
import { useState } from "react";
import { getSectionByFilter } from "@/actions/section/get-section";
import numeral, { Numeral } from "numeral";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { Ellipsis, Pencil, Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TypographyH3 } from "@/components/typography/h3";
import { Strand } from "@/lib/helpers/strand";

function SectionList() {
  const [school_year, setSchoolYear] = useState(
    new Date().getFullYear().toString()
  );

  const { data, isPending } = useQuery({
    queryKey: ["section-list-page", school_year],
    queryFn: async () => await getSectionByFilter({ school_year }),
  });

  return (
    <div className="space-y-5">
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
      <SelectYear value={school_year} onValueChange={(v) => setSchoolYear(v)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Section Name</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Academic Strand</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((section) => (
            <TableRow key={section._id} className="font-medium">
              <TableCell className="uppercase">
                {section.section_name}
              </TableCell>
              <TableCell>{section.grade_level}</TableCell>
              <TableCell>
                {Strand[section.academic_strand.toUpperCase()]}
              </TableCell>
              <TableCell>{numeral(section.semester).format("Oo")}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4 m-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/section/edit/${section._id}`}>
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No section found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SectionList;

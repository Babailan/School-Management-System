"use client";

import { Text } from "@radix-ui/themes";
import SelectYear from "../../components/select/year";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { GetCurriculumByFilter } from "@/actions/curriculum/get-curriculum";
import Loading from "@/app/loading";
import numeral from "numeral";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Plus } from "lucide-react";
import { TypographyH3 } from "@/components/typography/h3";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { data, isPending } = useQuery({
    queryKey: ["curriculum-list", year],
    queryFn: async () => await GetCurriculumByFilter({ year }),
  });

  return (
    <div className="space-y-5 p-10">
      <div className="flex justify-between">
        <TypographyH3>Curriculum</TypographyH3>
        <Link href="/curriculum/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Curriculum
          </Button>
        </Link>
      </div>
      <div>
        <SelectYear
          onValueChange={(year) => setYear(year)}
          defaultValue={year}
        />
      </div>
      <CurriculumList data={data} year={year} isPending={isPending} />
    </div>
  );
}

function CurriculumList({ data, year, isPending }) {
  if (isPending) {
    return <Loading disablePadding />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Curriculum Name</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length == 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No available Curriculum for the year {year} - {Number(year) + 1}
            </TableCell>
          </TableRow>
        )}
        {data.map(({ _id, gradeLevel, semester }, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>Grade {gradeLevel} Senior High</TableCell>
              <TableCell>{numeral(semester).format("0o")} Semester</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60 m-2">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/curriculum/${_id}`}>
                      <DropdownMenuItem>
                        <Pencil1Icon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/curriculum/view/${_id}`}>
                      <DropdownMenuItem>
                        <EyeOpenIcon className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

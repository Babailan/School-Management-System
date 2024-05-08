"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSubjectSearchAction } from "@/actions/subject/get-subject";
import Link from "next/link";
import Loading from "@/app/loading";
import { TypographyH3 } from "@/components/typography/h3";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pencil, Plus, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function ListSubjectPage() {
  const { isPending, data, isError } = useQuery({
    queryKey: ["subject", 1],
    queryFn: async () => await getSubjectSearchAction(1, "", 0),
  });

  if (isPending) {
    return <Loading disablePadding />;
  }
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <TypographyH3>Subject List</TypographyH3>
        <Link href={"/subjects/add"} legacyBehavior>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Add Subject
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Subject Code</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.results.map(({ subjectCode, subjectName, _id }, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="uppercase">{subjectName}</TableCell>
                <TableCell className="uppercase">{subjectCode}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <Ellipsis className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 m-2">
                      <Link href={`/subjects/edit/${_id}`}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

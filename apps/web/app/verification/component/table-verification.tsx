"use client";

import { getVerificationSearchAction } from "@/actions/verification/get-verification";
import Loading from "@/app/loading";
import { NormalPagination } from "@/components/pagination/pagination";
import { Badge } from "@/components/ui/badge";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Ellipsis } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TableVerification() {
  const searchParams = useSearchParams();
  const { data, isPending } = useQuery({
    queryFn: async () =>
      await getVerificationSearchAction(
        searchParams.get("search") || "",
        Number(searchParams.get("page")) || 1,
        10
      ),
    queryKey: [searchParams.toString(), "table-verification"],
  });

  return (
    <div className="pb-5 space-y-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead>Strand</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Reference Number</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.results.map((student, idx) => {
            return (
              <TableRow className="capitalize" key={idx}>
                <TableCell>
                  {student.verified ? <Badge>Verified</Badge> : <Badge variant="destructive">Not Verified</Badge>}
                </TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.middleName}</TableCell>
                <TableCell>{student.gradeLevel}</TableCell>
                <TableCell className="uppercase">{student.strand}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell className="uppercase">
                  {student.referenceNumber}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60 m-4">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={`/verification/pre-accept/${student._id}`}>
                        <DropdownMenuItem>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit | Verify
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
          {data?.results.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No available verification
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isPending && <Loading disablePadding />}
      <NormalPagination totalPage={data?.totalPages ?? 1} />
    </div>
  );
}

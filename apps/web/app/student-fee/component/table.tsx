"use client";

import { getStudentFeeSearchAction } from "@/actions/student-fee/get-student-fee";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, FolderCog } from "lucide-react";
import Link from "next/link";

export default function TableStudentFee() {
  const { data, isPending } = useQuery({
    queryKey: [],
    queryFn: async () => await getStudentFeeSearchAction("", 1, 10),
  });
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Full name</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.results.map((student) => {
            const balance = student.assessment.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue.amount;
              },
              0
            );
            return (
              <TableRow key={student._id}>
                <TableCell className="font-medium capitalize">
                  {balance >= 1 ? (
                    <Badge variant="destructive">Not Paid</Badge>
                  ) : (
                    <Badge>Paid</Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium capitalize">{`${student.lastName}, ${student.firstName} ${student.middleName}`}</TableCell>
                <TableCell className="font-medium">
                  ₱{numeral(balance).format("0,")}
                </TableCell>
                <TableCell align="right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={"/student-fee/manage/" + student._id}>
                        <DropdownMenuItem className="gap-2">
                          <FolderCog  size={16}/>
                          Manage
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
              <TableCell
                className="font-medium py-5 capitalize"
                colSpan={4}
                align="center"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isPending && <Loading disablePadding />}
    </>
  );
}

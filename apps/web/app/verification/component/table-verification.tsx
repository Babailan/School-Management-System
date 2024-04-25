import { getVerificationSearchAction } from "@/actions/verification/get-verification";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Ellipsis } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default async function TableVerification({ search, limit }) {
  const data = await getVerificationSearchAction(search ?? "", 1, 10, {
    verified: false,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
  );
}

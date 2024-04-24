"use client";

import { useQuery } from "@tanstack/react-query";
import { GetVerificationSearchAction } from "@/actions/verification/get-verification";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "../loading";
import Link from "next/link";
import { TypographyH3 } from "@/components/typography/h3";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Edit2, Ellipsis } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  // const [year, setYear] = useState(new Date().getFullYear().toString());
  // const [limit, setLimit] = useState("10");
  // const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryFn: async () =>
      await GetVerificationSearchAction(searchInput, page, 10),
    queryKey: ["verification", searchInput, page],
  });
  useEffect(() => {
    setPage(1);
  }, [searchInput]);

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Verification</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold">Verification</h1>
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for student"
      />
      <div>
        {isPending ? (
          <Loading disablePadding  />
        ) : (
          <Table>
            <TableCaption>List of verification</TableCaption>
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
                    <TableCell className="uppercase">
                      {student.strand}
                    </TableCell>
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
                          <Link
                            href={`/verification/pre-accept/${student._id}`}
                          >
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
        )}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={() => {
              if (page <= 1) return;
              setPage(page - 1);
            }}
          >
            <PaginationPrevious href="#" />
          </PaginationItem>
          {page > 1 && (
            <PaginationItem>
              <PaginationLink href="#">{page - 1}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{page + 1}</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => setPage(page + 1)}>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

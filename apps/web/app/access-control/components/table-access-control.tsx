"use client";

import { getAccessControlSearchAction } from "@/actions/access-control/get-access-control";
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
import { Ellipsis } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function TableAccessControl() {
  const searchParams = useSearchParams();
  const { data, isPending } = useQuery({
    queryKey: [searchParams.toString(), "table-access-control-list"],
    queryFn: async () =>
      await getAccessControlSearchAction(
        searchParams.get("search") || "",
        1,
        10,
        { $nor: [{ type: "root" }] }
      ),
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.results.map((account) => {
          return (
            <TableRow key={account._id}>
              <TableCell className="font-medium capitalize">
                {account.lastName}, {account.firstName} {account.middleName}
              </TableCell>
              <TableCell>
                {account.roles.map((role,key) => (
                  <Badge className="capitalize" key={key}>
                    {role}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/access-control/edit/${account._id}`}>
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
  );
}

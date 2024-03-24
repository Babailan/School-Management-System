"use client";
import { getAllTuitionFee } from "@/actions/tuition/get-tuition";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Heading, Text, TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Loading from "../loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["tuitionlist"],
    queryFn: async () => await getAllTuitionFee(),
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Tuition Fee</h1>
        <Link href={"/tuition/create"}>
          <Button className="gap-2">
            <Plus />
            Create Tuition
          </Button>
        </Link>
      </div>
      {isPending ? <Loading disablePadding /> : <TuitionList data={data} />}
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Plus } from "lucide-react";
import numeral from "numeral";

const TuitionList = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tuition Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((tuition, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell className="uppercase">
                {tuition.tuition_title}
              </TableCell>
              <TableCell>₱{numeral(tuition.amount).format("0,")}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="m-4">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
        {data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No tuition fee found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

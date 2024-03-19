"use client";
import { getTuitionSearchAction } from "@/actions/tuition/get-tuition";
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
    queryFn: async () => await getTuitionSearchAction(),
  });

  return (
    <div className="space-y-5 p-10">
      <h1 className="text-2xl font-bold">Tuition Fee</h1>
      <Link href={"/tuition/add"}>
        <Button variant="ghost">Add Tuition</Button>
      </Link>
      {isPending ? <Loading disablePadding /> : <TuitionList data={data} />}
    </div>
  );
}

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
              <Table>{tuition.tuition_title}</Table>
              <Table>₱{tuition.amount}</Table>
              <Table>
                <Link href={`/tuition/`}>
                  <Button className="hover:cursor-pointer">
                    <Pencil1Icon /> Edit
                  </Button>
                </Link>
              </Table>
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

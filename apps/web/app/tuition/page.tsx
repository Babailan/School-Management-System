import { getTuitionSearchAction } from "@/actions/tuition/get-tuition";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Plus, Trash } from "lucide-react";
import numeral from "numeral";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const data = await getTuitionSearchAction("", 1, 0);

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tuition Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((tuition, idx) => {
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
                      <Link href={"/tuition/edit/" + tuition._id}>
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
          {data.results.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No tuition fee found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

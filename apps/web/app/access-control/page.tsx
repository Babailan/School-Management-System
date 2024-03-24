import { Box, Flex, Text } from "@radix-ui/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH3 } from "@/components/typography/h3";

export default function AccessControlPage() {
  return (
    <div className="p-10 space-y-5">
      <div className="flex justify-between">
        <TypographyH3 className="text-3xl font-bold">
          Access Control
        </TypographyH3>
        <Link href={"/access-control/create"}>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </Link>
      </div>
      <div>
        <p className="mb-1">Role</p>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select a Role"></SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="administrator">Administrator</SelectItem>
            <SelectItem value="faculty">Faculty</SelectItem>
            <SelectItem value="registrar">Registrar</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
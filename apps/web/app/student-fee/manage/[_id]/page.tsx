import { getStudentFeeById } from "@/actions/student-fee/get-student-fee";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CircleUser,
  Ellipsis,
  HandCoins,
  Receipt,
  Trash,
  User,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment-timezone";
import numeral from "numeral";

import ActionsStudentFees from "./component/actions";
import { flatMap } from "lodash";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page({ params: { _id } }) {
  const data = await getStudentFeeById(_id);
  const history = flatMap(data.assessment, "history");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Manage Fees</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Personal information typically includes details such as name,
            address, contact number, and other relevant identifiers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div>
              <CircleUser size={50} strokeWidth={0.5} />
            </div>
            <div>
              <p className="capitalize">
                {data.lastName}, {data.firstName} {data.middleName}
              </p>
              <p className="lowercase text-sm text-muted-foreground">
                {data.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2" size="sm">
            <Receipt size={16} />
            Payment History
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment History</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-60">
            <Table>
              <TableCaption>A list of your payment.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((payment, key) => {
                  if (payment == undefined) {
                    return null;
                  }
                  return (
                    <TableRow key={key}>
                      <TableCell>
                        {moment(payment.issue_date).format(
                          "MMMM Do YYYY, h:mm:ss A"
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        ₱ {numeral(payment.amount).format("0,")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type of Fee</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.assessment.map((assessment) => {
            return (
              <TableRow key={assessment._id}>
                <TableCell className="font-medium capitalize">
                  {assessment.type}
                </TableCell>
                <TableCell>
                  ₱{numeral(assessment.amount).format("0,")}
                </TableCell>
                <TableCell>
                  {moment(assessment.issue_date).format("MMMM, Do YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  <ActionsStudentFees _id={_id} assessment={assessment} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

import { getSectionByIdAction } from "@/actions/section/get-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import _ from "lodash";

export default async function SectionView({ params: { _id } }) {
  const section = await getSectionByIdAction(_id);

  if (section.students) {
    section.students = section.students.sort((a, b) => a.fullName - b.fullName);
  }
  return (
    <div className="space-y-5">
      <div>
        <h1 className="uppercase text-2xl font-bold">{section.section_name}</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {_.get(section, "students")?.map((student) => (
            <TableRow key={student._id}>
              <TableCell className="font-medium capitalize">
                {student.lastName}, {student.firstName} {student.middleName}
              </TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

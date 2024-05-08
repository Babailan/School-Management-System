import { getSectionByIdAction } from "@/actions/section/get-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import _ from "lodash";
import numeral from "numeral";

export default async function SectionView({ params: { _id } }) {
  const section = await getSectionByIdAction(_id);

  if (section.students) {
    section.students = section.students.sort((a, b) => a.fullName - b.fullName);
  }
  return (
    <div className="space-y-5">
      <div>
        <h1 className="uppercase text-2xl font-bold">{section.section_name}</h1>
        <div className="space-x-2">
          <Badge>{numeral(section.semester).format("0o")} Semester</Badge>
          <Badge className="uppercase">Academic Strand : {section.academic_strand}</Badge>
          <Badge className="uppercase">Grade Level : {section.grade_level}</Badge>
        </div>
      </div>
      <h2 className="text-xl font-bold">Male List</h2>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {_.filter(
              _.get(section, "students"),
              (student) => student.sex == "male"
            )?.map((student) => (
              <TableRow key={student._id}>
                <TableCell className="font-medium capitalize">
                  {student.lastName}, {student.firstName} {student.middleName}
                </TableCell>
                <TableCell className="text-right">
                  ₱{" "}
                  {numeral(
                    student.assessment.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.amount,
                      0
                    )
                  ).format("0,")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <h2 className="text-xl font-bold">Female List</h2>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {_.filter(
              _.get(section, "students"),
              (student) => student.sex == "female"
            )?.map((student) => (
              <TableRow key={student._id}>
                <TableCell className="font-medium capitalize">
                  {student.lastName}, {student.firstName} {student.middleName}
                </TableCell>
                <TableCell className="text-right">
                  ₱{" "}
                  {numeral(
                    student.assessment.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.amount,
                      0
                    )
                  ).format("0,")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

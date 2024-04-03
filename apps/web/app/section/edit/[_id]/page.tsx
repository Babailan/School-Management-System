import { GetSectionByIdAction } from "@/actions/section/get-section";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import numeral from "numeral";

export default async function Page({ params: { _id } }) {
  const data = await GetSectionByIdAction(_id);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold uppercase">{data.section_name}</h1>
        <div className="space-x-2">
          <Badge variant="outline">Grade {data.grade_level}</Badge>
          <Badge variant="outline">Year {data.school_year}</Badge>
          <Badge variant="outline">
            {numeral(data.semester).format("Oo")} Semester
          </Badge>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Subject Code</TableHead>
            <TableHead>Subject Name</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.subjects?.map((subject, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium uppercase">
                {subject.subjectCode}
              </TableCell>
              <TableCell className="uppercase">{subject.subjectName}</TableCell>
              <TableCell>dwadw</TableCell>
              <TableCell className="text-right">
                <Ellipsis className="w-4 h-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

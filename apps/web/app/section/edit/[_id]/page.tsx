import { GetAllFacultyActions } from "@/actions/faculty/get-faculty";
import { GetSectionByIdAction } from "@/actions/section/get-section";
import { Text } from "@radix-ui/themes";
import { TypographyH3 } from "@/components/typography/h3";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Trash, User } from "lucide-react";

export default async function Page({ params }) {
  const _id = params._id;
  const faculty = await GetAllFacultyActions();
  const section = await GetSectionByIdAction(_id);
  const subjects = section?.subjects ?? [];

  return (
    <div className="space-y-5 p-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/section">Section</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Section</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TypographyH3>
        Section: {section.sectionName} - {section.year}
      </TypographyH3>

      <Table>
        <TableCaption>
          List of subjects for {section.sectionName} - {section.year} to{" "}
          {Number(section.year) + 1}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Subject Code</TableHead>
            <TableHead>Subject Teacher / Instructor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subjects?.map(
            ({ subjectName, subjectCode, subject_teacher }, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="uppercase">{subjectName}</TableCell>
                  <TableCell className="uppercase">{subjectCode}</TableCell>
                  <TableCell>
                    {subject_teacher ?? (
                      <Text color="red" weight="medium">
                        No teacher is selected
                      </Text>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="size-6">
                          <Ellipsis className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-60 m-2">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <User className="mr-2 w-4 h-4" />
                            Assign to...
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>Teacher 1</DropdownMenuItem>
                              <DropdownMenuItem>Teacher 2</DropdownMenuItem>
                              <DropdownMenuItem>Teacher 3</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash className="mr-2 w-4 h-4" />
                          Remove Teacher
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
}

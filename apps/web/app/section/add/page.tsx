"use client";

import { SelectSubject, SelectYear } from "@/components/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleAlert, CirclePlus, Plus } from "lucide-react";
import { DialogSubject } from "@/components/dialog/DialogSubject";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  year: z.string().min(1, "Year is required"),
  section_name: z.string().min(1, "Section is required"),
  subjects: z.array(
    z.object({
      _id: z.string(),
      subjectName: z.string(),
      subjectCode: z.string(),
    })
  ),
});

export default function SectionAdd() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: "",
      section_name: "",
      subjects: [],
    },
  });

  const addSubject = (subject) => {
    // dont mutate if subjcet already exists
    if (form.getValues().subjects.some((s) => s._id === subject._id)) {
      return;
    }

    form.setValue("subjects", [...form.getValues().subjects, subject], {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link legacyBehavior passHref href={"/section"}>
              <BreadcrumbLink>Section</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Section</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-2xl font-bold">Create New Section</h1>
        <p className="text-muted-foreground">
          Once you create a section, you can't edit the subjects anymore.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-2">
          <FormField
            control={form.control}
            name="section_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <SelectYear onValueChange={field.onChange} />
                </FormControl>
                <FormDescription>The year of section.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end !my-5">
            <DialogSubject onSubjectSelected={addSubject}>
              <Button type="button" size="sm">
                <CirclePlus className="h-4 w-4 mr-1" />
                Add Subject
              </Button>
            </DialogSubject>
          </div>
          <div className="p-5 rounded-md border-dashed border h-96">
            <h2 className="text-xl font-bold">Subjects</h2>
            <p className="text-muted-foreground text-sm">
              List of subjects that will be added to this section.
            </p>
            <Table className="mt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Subject Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {form.getValues().subjects.map((subject, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="uppercase">
                      {subject?.subjectName}
                    </TableCell>
                    <TableCell className="uppercase">
                      {subject?.subjectCode}
                    </TableCell>
                  </TableRow>
                ))}
                {form.getValues().subjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No subjects added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import {
  SelectGradeLevel,
  SelectSemester,
  SelectStrand,
  SelectYear,
} from "@/components/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import {
  CheckCircle,
  CircleAlert,
  CircleCheck,
  CirclePlus,
  Ellipsis,
  Plus,
  Trash,
} from "lucide-react";
import { DialogSubject } from "@/components/dialog/DialogSubject";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { addSectionAction } from "@/actions/section/add-section";

const formSchema = z.object({
  school_year: z.string().min(1, "Year is required"),
  section_name: z.string().min(1, "Section is required"),
  subjects: z.array(
    z.object({
      _id: z.string(),
      subjectName: z.string(),
      subjectCode: z.string(),
    })
  ),
  grade_level: z.string().min(1, "Grade level is required"),
  academic_strand: z.string().min(1, "Academic Strand is required"),
  semester: z.string().min(1, "Semester is required"),
});

export default function SectionAdd() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school_year: "",
      section_name: "",
      subjects: [],
      grade_level: "",
      semester: "",
      academic_strand: "",
    },
  });

  const addSubject = (subject) => {
    if (form.getValues().subjects.some((s) => s._id === subject._id)) {
      toast({
        action: (
          <div className="w-full flex !m-0">
            <CircleAlert className="mr-2" />
            <span className="first-letter:capitalize">
              The subject has already been added.
            </span>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    form.setValue("subjects", [...form.getValues().subjects, subject], {
      shouldValidate: true,
    });
    //toast
    toast({
      action: (
        <div className="w-full flex !m-0">
          <CheckCircle className="mr-2" />
          <span className="first-letter:capitalize">successfully updated</span>
        </div>
      ),
    });
  };

  const removeSubject = (subject) => {
    return () => {
      form.setValue(
        "subjects",
        form.getValues().subjects.filter((s) => s._id !== subject._id),
        {
          shouldValidate: true,
        }
      );
    };
  };

  const submitForm = async () => {
    const valid = await form.trigger();
    if (valid) {
      const result = await addSectionAction(form.getValues());
      if (result.success) {
        toast({
          title: result.message,
        });
      } else {
        toast({
          title: result.message,
          variant: "destructive",
        });
      }
    }
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
        <form className="space-y-2 !last:mb-10">
          <div className="flex *:w-full gap-2">
            <FormField
              control={form.control}
              name="section_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Section Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    School Year <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <SelectYear onValueChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Semester <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <SelectSemester onValueChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="grade_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Grade Level <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SelectGradeLevel onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="academic_strand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Academic Strand <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SelectStrand onValueChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className="flex justify-end !my-5">
            <DialogSubject onSubjectSelected={addSubject}>
              <Button type="button" size="sm">
                <CirclePlus className="h-4 w-4 mr-1" />
                Add Subject
              </Button>
            </DialogSubject>
          </div>
          <Alert className="mb-5">
            <CircleAlert className="h-4 w-4 mr-2" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Once you create a section, you can't edit the subjects anymore.
            </AlertDescription>
          </Alert>
          <div className="p-5 rounded-md border">
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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={removeSubject(subject)}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {form.getValues().subjects.length === 0 && (
                  <TableRow className="h-[calc(100vh/2)]">
                    <TableCell colSpan={2} className="text-center">
                      No subjects added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" className="!mb-5">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This will create a new section and add the subjects to it.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogTrigger asChild onClick={submitForm}>
                  <Button>Confirm</Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
}

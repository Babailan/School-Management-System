"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  SelectYear,
  SelectGradeLevel,
  SelectSemester,
} from "@/components/select"; // Replace 'your-custom-components' with the actual custom components you are using
import { AddCurriculumAction } from "@/actions/curriculum/add-curriculum";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TypographyH3 } from "@/components/typography/h3";

const validationSchema = z.object({
  year: z.string().min(1, { message: "Year is required" }),
  gradeLevel: z.string().min(1, { message: "Grade Level is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
});
const FormAddCurriculum = () => {
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      year: "",
      gradeLevel: "",
      semester: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async () => {
    const valid = await form.trigger();

    if (valid) {
      form.handleSubmit(async (data) => {
        const response = await AddCurriculumAction(data);
        if (response.success) {
          toast({
            title: "Curriculum Added",
            description: "The curriculum has been added successfully",
          });
          form.reset();
        } else {
          toast({
            title: "Failed to add curriculum",
            description: response.message,
            variant: "destructive",
          });
        }
      })();
    }
  };

  return (
    <div className="p-10 space-y-5">
      <TypographyH3>Curriculum Information</TypographyH3>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <SelectYear
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Year of the curriculum to be added
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <FormControl>
                  <SelectGradeLevel
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Grade level of the curriculum to be added
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <SelectSemester
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Semester of the curriculum to be added
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 w-4 h-4" />
                )}
                Add Curriculum
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent style={{ maxWidth: 450 }}>
              <AlertDialogTitle>Add Curriculum</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure? Once you confirm, the curriculum will be added.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="button" onClick={onSubmit}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </div>
  );
};

export default FormAddCurriculum;

"use client";

import AddSubjectAction from "@/actions/subject/add-subject";

import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

const formSchema = z.object({
  subjectName: z.string().min(1, {
    message: "Subject name is required",
  }),
  subjectCode: z.string().min(1, {
    message: "Subject code is required",
  }),
});
export default function Page() {
  const { toast } = useToast();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectName: "",
      subjectCode: "",
    },
  });

  const submit = async () => {
    const valid = await form.trigger();
    if (valid) {
      const data = form.getValues();
      const result = await AddSubjectAction(data);
      if (result.success) {
        toast({
          title: "Successfully added subject",
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
      <div>
        <h1 className="text-2xl font-bold">Subject Information</h1>
        <p className="text-muted-foreground">
          Make sure you fill out the right information for the subject.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-5">
          <FormField
            control={form.control}
            name="subjectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject Name <span className="text-destructive">*</span>
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
            name="subjectCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject Code <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will create a new subject.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </div>
  );
}

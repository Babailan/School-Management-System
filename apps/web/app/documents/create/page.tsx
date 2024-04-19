"use client";

import { Button } from "@/components/ui/button";
import { Info, Loader2, Plus } from "lucide-react";
import Link from "next/link";
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
import { addDocumentAction } from "@/actions/documents/add-documents";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const schema = z.object({
  document_name: z.string().min(1, "Document name is required"),
  active_status:z.boolean(),
});

export default function Page() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      document_name: "",
      active_status: false,
    },
  });

  const submit = async () => {
    const valid = await form.trigger();

    // await 3 seconds
    if (valid) {
      // submit form
      form.handleSubmit(async (values) => {
        const result = await addDocumentAction(values.document_name);
        if (result.success) {
          toast({
            variant: "success",
            title: "Document created",
            description: "The document has been created successfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed to create document",
            description: result.message,
          });
        }
      })();
    }
  };

  return (
    <div className="space-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link legacyBehavior passHref href={"/documents"}>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link legacyBehavior passHref href={"/documents"}>
              <BreadcrumbLink>Documents</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Documents</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="font-bold text-2xl">Create Documents</h1>
      </div>

      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="document_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Document Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Card>

          </Card>
          <FormField
            control={form.control}
            name="active_status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Active Status
                </FormLabel>
                <FormDescription>
                  You can manage the active status of the 
                  <Link href={"/documents"}>
                    <Button variant="link" className="p-1">documents page.</Button>
                  </Link> 
                    
                </FormDescription>
              </div>
            </FormItem>
            )}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="gap-2 !mt-5"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Create Document
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  By taking this action, a new document will be created for the
                  purpose of verifying the students.
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

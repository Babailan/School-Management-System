"use client";

import { addTuitionAction } from "@/actions/tuition/add-tuition";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={"/"} passHref legacyBehavior>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={"/tuition"} passHref legacyBehavior>
              <BreadcrumbLink>Tuition List</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add Tuition</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold">New Tuition Fee</h1>
      <AddTuitionForm />
    </div>
  );
}

const tuitionSchema = z.object({
  tuition_title: z.string().min(1, "Tuition title is required"),
  amount: z.coerce
    .number()
    .min(0, "Amount is required")
    .nonnegative("Amount must be a positive number"),
});

const AddTuitionForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {
      tuition_title: "",
      amount: "",
    },
  });
  const submit = async (data) => {
    const result = await addTuitionAction(data.tuition_title, data.amount);
    if (result.success) {
      toast({
        title: "Tuition added",
        description: "Tuition has been added successfully.",
      });
    } else {
      toast({
        title: "Failed to add tuition",
        description: result.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(submit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="tuition_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tuition Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter tuition title" {...field} />
              </FormControl>
              <FormDescription>(e.g., Grade 11 - ABM).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Amount <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tuition title"
                  {...field}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) return;
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Tuition
        </Button>
      </form>
    </Form>
  );
};

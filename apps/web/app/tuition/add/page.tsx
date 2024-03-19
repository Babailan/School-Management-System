"use client";

import { addTuitionAction } from "@/actions/tuition/add-tuition";
import PesoInput from "@/components/input/pesoinput";
import { toast } from "react-toastify";
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

export default function Page() {
  return (
    <div className="space-y-5 p-10">
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
  amount: z
    .number()
    .min(1, "Amount is required")
    .nonnegative("Amount must be a positive number"),
});

const AddTuitionForm = () => {
  const form = useForm({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {},
  });
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="tuition_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tuition Title</FormLabel>
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
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter tuition title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="gap-2">
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </form>
    </Form>
  );
};

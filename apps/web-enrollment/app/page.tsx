"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  referenceNumber: z
    .string()
    .min(1, { message: "Reference number is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  strand: z.string().min(1, { message: "Strand is required" }),
  gradeLevel: z.string().min(1, { message: "Grade level is required" }),
  birthDate: z.string().min(1, { message: "Birth date is required" }),
});

export default function Home() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      email: "",
      lastName: "",
      middleName: "",
      referenceNumber: "",
      year: "",
      strand: "",
      gradeLevel: "",
      birthDate: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-auto my-10  max-w-4xl">
      <Tabs defaultValue="new">
        <TabsList className="w-full">
          <TabsTrigger value="new" className="w-full">
            New Student
          </TabsTrigger>
          <TabsTrigger value="password" className="w-full">
            Old Student
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex *:w-full gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Middle Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="password">
          <form>
            <header>
              <h1 className="font-semibold text-2xl">For Old Student</h1>
            </header>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

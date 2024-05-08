"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { newRecord } from "@/actions/enroll/add";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import SelectYear from "@/components/select/year";
import SelectSex from "@/components/select/sex";
import SelectStrand from "@/components/select/strand";
import SelectGradeLevel from "@/components/select/grade-level";

const schema = z.object({
  lrn: z
    .string()
    .min(1, "Missing required field")
    .length(12, { message: "LRN must be 12 digit number" }),
  firstName: z.string().min(1, { message: "Missing required field." }),
  lastName: z.string().min(1, { message: "Missing required field." }),
  middleName: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Missing required field." })
    .email({ message: "Enter a valid email" }),
  birthday: z.string().min(1, { message: "Missing required field." }),
  phone: z.string().min(1, { message: "Missing required field." }),
  year: z.string().min(1, { message: "Missing required field." }),
  strand: z.string().min(1, { message: "Missing required field." }),
  gradeLevel: z.string().min(1, { message: "Missing required field." }),
  guardian: z.string().min(1, { message: "Missing required field." }),
  sex: z.enum(["male", "female"], {
    required_error: "Missing required field.",
  }),
  address: z.string().min(1, "Missing required field."),
});

export default function AddStudentsForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      birthday: "",
      phone: "",
      year: "",
      strand: "",
      gradeLevel: "",
      lrn: "",
      guardian: "",
      address: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    await newRecord(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-5">
        <h1 className="text-xl font-bold">Personal Information</h1>
        <FormField
          control={form.control}
          name="lrn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                LRN <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex *:w-full gap-5 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-destructive">*</span>
                </FormLabel>
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
                <FormLabel>
                  Last Name <span className="text-destructive">*</span>
                </FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex *:flex-1 gap-2">
          <FormField
            control={form.control}
            name="strand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Strand <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SelectStrand
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Grade Level <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SelectGradeLevel
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Birthday <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sex <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SelectSex value={field.value} onValueChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address <span className="text-destructive">*</span>
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
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Year <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SelectYear
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                The school year that you are applying for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h1 className="text-xl font-bold !mt-5">Contact Information</h1>
        <FormField
          control={form.control}
          name="guardian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Guardian Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter Guardian Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="gap-2 !my-5"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 size={16} className="animate-spin" />
          )}
          Submit Form
        </Button>
      </form>
    </Form>
  );
}

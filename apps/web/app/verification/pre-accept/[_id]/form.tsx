"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  SelectGradeLevel,
  SelectSex,
  SelectStrand,
  SelectTuition,
  SelectYear,
} from "@/components/select";
import { calculateAge } from "@/lib/date/age";
import { FolderCheck, FolderSync } from "lucide-react";
import { updateVerificationInfomationAction } from "@/actions/verification/update-verification";
import _ from "lodash";

const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  middleName: z.string().min(1, "Middle Name is required"),
  address: z.string().min(1, "Address is required"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  guardian: z.string().min(1, "Guardian Name is required"),
  strand: z.string().min(1, "Strand is required"),
  year: z.string().min(1, "Year is required"),
  gradeLevel: z.string().min(1, "Grade Level is required"),
  birthday: z.string().min(1, "Birthday is required"),
});

export default function EditVerificationForm({ data }) {
  const [birthday, setBirthday] = useState(data.birthday);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: _.merge(
      {
        firstName: "",
        lastName: "",
        middleName: "",
        address: "",
        email: "",
        phone: "",
        guardian: "",
        strand: "",
        year: "",
        gradeLevel: "",
        birthday: "",
      },
      data
    ),
  });
  const updateInformation = async () => {
    // update the information
  };
  const submit = async (formData) => {
    const result = await updateVerificationInfomationAction(formData, data._id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
        <h2 className="text-xl font-bold">Personal Information</h2>
        <div className="flex gap-2 *:w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
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
                  <Input placeholder="Enter last name" {...field} />
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
                  <Input placeholder="Enter middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Sex <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <SelectSex
                  value={field.value.toString()}
                  onValueChange={field.onChange}
                />
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
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex *:w-full gap-2">
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
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Birthday <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setBirthday(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel htmlFor={undefined}>
              Age <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                readOnly
                value={calculateAge(birthday).toString()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
        <div className="flex gap-2 *:w-full">
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
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  />
                </FormControl>
                <FormDescription>
                  The year you are applying for the school year.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h2 className="text-xl font-bold">Contact Information</h2>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone <span className="text-destructive">*</span>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-destructive">*</span>
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
          name="guardian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Guardian <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name of the guardian of the student.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 !my-5">
          <Button
            className="gap-2"
            type="submit"
            variant="secondary"
            onClick={updateInformation}
          >
            <FolderSync className="w-4 h-4" />
            Update Information
          </Button>
          <Button className="gap-2">
            <FolderCheck className="w-4 h-4" />
            Accept Student
          </Button>
        </div>
      </form>
    </Form>
  );
}

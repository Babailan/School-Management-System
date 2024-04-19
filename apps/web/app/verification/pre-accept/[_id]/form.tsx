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
import React, { useState } from "react";
import { useStep } from "usehooks-ts";
import {
  SelectGradeLevel,
  SelectSex,
  SelectStrand,
  SelectYear,
} from "@/components/select";
import { calculateAge } from "@/lib/date/age";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FolderCheck,
  FolderSync,
  Loader2,
  User,
} from "lucide-react";
import { updateVerificationInfomationAction } from "@/actions/verification/update-verification";
import _ from "lodash";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { diff } from "@/lib/helpers/diff";
import { cn } from "@/lib/utils";
import { DialogTuition } from "@/components/dialog/DialogTuition";
import { Select } from "@/components/ui/select";
import numeral from "numeral";
import { Label } from "@/components/ui/label";
import Confirmation from "./confirmation";

const personalInfomrationSchemaForm = z.object({
  lrn: z.string().min(1, "LRN is required"),
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
  documents: z.array(z.string()),
  sex: z.enum(["male", "female"]),
});

const confimrationSchema = z.object({
  tuition: z.string().min(1, "Tuition is required"),
});

const steps = [
  {
    label: "Personal Information",
  },
  {
    label: "Enrollment Confirmation",
  },
];

export default function EditVerificationForm({ data, documents }) {
  const [currentStep, helpers] = useStep(steps.length);

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  const defaultValues = _.merge(
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
      sex: "",
      lrn: "",
      documents: [],
    },
    _.omit(data, ["_id"]) as any
  );
  const queries = useQueryClient();
  const { toast } = useToast();
  const [birthday, setBirthday] = useState(data.birthday);
  const personalInformationForm = useForm<
    z.infer<typeof personalInfomrationSchemaForm>
  >({
    resolver: zodResolver(personalInfomrationSchemaForm),
    defaultValues: defaultValues,
  });

  const [tuition, setTuition] = useState("");

  const updateInformation = async () => {
    await personalInformationForm.handleSubmit(async (formData) => {
      const tobeUpdated = JSON.parse(
        JSON.stringify(diff(defaultValues, formData))
      );
      const result = await updateVerificationInfomationAction(
        tobeUpdated,
        data._id
      );
      if (result.success) {
        toast({
          title: "Edit Successfully",
          description: "Student information has been updated",
          variant: "success",
        });
      }
      queries.clear();
    })();
  };

  return (
    <div className="space-y-5">
      <nav className="flex gap-5 justify-center items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col justify-center items-center">
              <span
                className={cn(
                  currentStep == index + 1 ? "border-primary" : "",
                  "border size-10 flex items-center justify-center rounded-full"
                )}
              >
                {index + 1}
              </span>
              <span>{step.label}</span>
            </div>
            {index != steps.length - 1 && (
              <Separator className="flex-1 max-w-96" />
            )}
          </React.Fragment>
        ))}
      </nav>
      <Form {...personalInformationForm}>
        <form
          className={cn(
            "space-y-2 pb-10",
            currentStep == 1 ? "block" : "hidden"
          )}
        >
          <h2 className="text-xl font-bold">Personal Information</h2>

          <div className="flex gap-2 *:w-full">
            <FormField
              control={personalInformationForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={personalInformationForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={personalInformationForm.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={personalInformationForm.control}
            name="lrn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  LRN <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={personalInformationForm.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sex <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <SelectSex
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={personalInformationForm.control}
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
              control={personalInformationForm.control}
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
              control={personalInformationForm.control}
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
                  value={calculateAge(
                    personalInformationForm.getValues("birthday")
                  ).toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          <div className="flex gap-2 *:w-full">
            <FormField
              control={personalInformationForm.control}
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
              control={personalInformationForm.control}
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
            control={personalInformationForm.control}
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
            control={personalInformationForm.control}
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
            control={personalInformationForm.control}
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

          <Separator />
          <div className="space-y-2">
            <div>
              <h1 className="font-bold">Documents</h1>
              <p className="text-sm text-muted-foreground">
                Please select the documents that the student has submitted.
              </p>
            </div>
            <div className="space-y-2">
              {documents.map((item) => (
                <FormField
                  key={item._id}
                  control={personalInformationForm.control}
                  name="documents"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item._id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item._id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal uppercase">
                          {item.document_name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-5">
            <Button
              className="gap-2"
              type="button"
              variant="secondary"
              onClick={updateInformation}
              disabled={personalInformationForm.formState.isSubmitting}
            >
              {personalInformationForm.formState.isSubmitting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <FolderSync className="w-4 h-4" />
              )}
              Update Information
            </Button>
            <Button
              className="gap-2"
              disabled={personalInformationForm.formState.isSubmitting}
              type="button"
              onClick={goToNextStep}
            >
              {personalInformationForm.formState.isSubmitting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              Confirmation Page
            </Button>
          </div>
        </form>
      </Form>
      <Confirmation goToPrevStep={goToPrevStep} currentStep={currentStep} data={data} />
    </div>
  );
}

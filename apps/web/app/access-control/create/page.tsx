"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TypographyH4 } from "@/components/typography/h4";
import { createAccountAction } from "@/actions/account/create-account";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

const roles = ["faculty", "registrar", "administrator"] as const;

const validationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleName: z.string().optional(),
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  roles: z.array(z.enum(["administrator", "faculty", "registrar"])).nonempty({
    message: "You have to select at least one item.",
  }),
});

export default function CreateUser() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
      roles: [] as string[],
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const onSubmit = async (data) => {
    const { success, message } = await createAccountAction(data);
    if (success) {
      toast({
        title: "Account created",
        description: "The user account has been created",
      });
    } else {
      toast({
        title: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-10 space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Alert>
        <AlertTitle>Reminder!</AlertTitle>
        <AlertDescription>
          Once the user is created, the user will receive an email to verify.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <header className="text-3xl font-bold">Create User</header>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <div className="*:w-full flex gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
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
                    <Input placeholder="Enter your middle name" {...field} />
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
                    <Input placeholder="Enter your last name" {...field} />
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
                <FormLabel>
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter the email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter the password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <TypographyH4>
              Pick a roles <span className="text-destructive">*</span>
            </TypographyH4>
            {roles.map((role, idx) => (
              <FormField
                key={role}
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={role}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, role])
                              : field.onChange(
                                  field.value?.filter((value) => value !== role)
                                );
                          }}
                          checked={field.value.includes(role)}
                        />
                        <Label htmlFor={role} className="capitalize">
                          {role}
                        </Label>
                      </div>
                    </FormControl>
                    {idx === roles.length - 1 && <FormMessage />}
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin mr-2" />
            )}
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2Icon } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { createAccountAction } from "@/actions/account/create-account";

const roles = ["faculty", "registrar", "administrator", "cashier"] as const;

const schema = z.object({
  firstName: z.string().min(1, { message: "Missing required field." }),
  lastName: z.string().min(1, { message: "Missing required field." }),
  middleName: z.string().optional(),
  email: z
    .string()
    .min(1, "Missing required field.")
    .email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Missing required field." }),
  roles: z.array(z.enum(roles)).nonempty({
    message: "You have to select at least one item.",
  }),
  pin: z.string().length(6, "PIN is required"),
  username: z.string().min(1, "Missing required field."),
});

export default function CreateUser() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
      roles: [],
      pin: "",
      username: "",
    },
  });

  const onSubmit = async (data) => {
    const { success, message } = await createAccountAction(data);
    if (success) {
      toast({
        title: "Account created.",
        description: "The user account has been created.",
        variant: "success",
      });
    } else {
      toast({
        title: "Failed to create account.",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/access-control">
              Access Control
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <header className="text-3xl font-bold">Create User</header>
      </div>
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
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
                    <Input placeholder="Enter first name" {...field} />
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
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    {...field}
                    autoComplete="off"
                  />
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
            <h2 className="text-xl font-bold">
              Pick a roles <span className="text-destructive">*</span>
            </h2>
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
                          disabled={role == "faculty" ? true : false}
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

          <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                disabled={form.formState.isSubmitting}
                className="!mb-10"
                onClick={async () => {
                  if (
                    await form.trigger([
                      "email",
                      "firstName",
                      "lastName",
                      "middleName",
                      "password",
                      "username",
                      "roles",
                    ])
                  ) {
                    setOpen(true);
                  }
                }}
              >
                Create Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Enter your 6 PIN</AlertDialogTitle>
                <AlertDialogDescription>
                  This will create new user account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="m-auto">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          disabled={form.formState.isSubmitting}
                          pattern={REGEXP_ONLY_DIGITS}
                          {...field}
                          onChange={async (pin) => {
                            field.onChange(pin);
                            if (pin.length === 6) {
                              await form.handleSubmit(onSubmit)();
                              setOpen(false);
                              form.setValue("pin", "");
                            }
                          }}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin m-auto" />
              )}
              <AlertDialogFooter className="!justify-center">
                {form.formState.isSubmitting || (
                  <Button variant="link" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </div>
  );
}

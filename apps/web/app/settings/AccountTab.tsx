"use client";
import { Button } from "@/components/ui/button";
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
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { MutableRefObject, Ref, useRef, useState } from "react";
import { accountUpdateProfileAction } from "@/actions/account/update-account";
import _ from "lodash";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  middleName: z.string().optional(),
});

export default function SettingsAccountProfileTab({ data }) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: data.email ?? "",
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      middleName: data.middleName ?? "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const confirmPassword = useRef<HTMLInputElement>(null);
  const preSubmit = async () => {
    const confirmationPassword = confirmPassword.current?.value;
    if (!confirmationPassword) {
      toast({
        variant: "destructive",
        title: "Confirmation password is required",
      });
      return;
    }
    const validation = await form.trigger();
    setIsOpen(false);
    if (!validation) return;

    form.handleSubmit(async (newData) => {
      const result = await accountUpdateProfileAction(
        newData,
        confirmationPassword
      );
      if (result.success) {
        toast({
          title: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: result.message,
        });
      }
    })();
  };
  return (
    <Form {...form}>
      <form className="space-y-2">
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
        <div className="flex gap-2">
          <FormField
            control={form.control}
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
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
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

        <Button
          type="button"
          className="!my-5"
          onClick={() => setIsOpen(true)}
          disabled={form.formState.isSubmitting}
        >
          Save Changes
        </Button>
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently change your
                current account information.
              </AlertDialogDescription>
              <Input
                ref={confirmPassword}
                type="password"
                placeholder="Confirm your password"
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={() => setIsOpen(false)}
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button onClick={preSubmit} type="button">
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}

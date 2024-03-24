"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  "current-password": z.string().min(1, "Please enter your current password"),
  "new-password": z
    .string()
    .min(1, "Please enter your new password")
    .min(6, "Password must be at least 6 characters long"),
  "confirm-password": z.string().min(1, "Please confirm your new password"),
});

export default function SettingsPasswordTab() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      "current-password": "",
      "new-password": "",
      "confirm-password": "",
    },
  });

  const submit = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
        <FormField
          control={form.control}
          name="current-password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Current Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new-password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                New Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm-password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="my-2">
          Submit
        </Button>
      </form>
    </Form>
  );
}

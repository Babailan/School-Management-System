"use client";
import { LoginAccountAction } from "@/actions/account/login-account";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().min(1, "Please enter a username or email"),
  password: z.string().min(1, "Please enter a password."),
});

export default function CredientialLogin() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onSubmit",
  });
  const router = useRouter();

  const login = async (values: z.infer<typeof schema>) => {
    const result = await LoginAccountAction(values.email, values.password);
    if (result?.success == false) {
      toast({
        description: result.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? "Logging in...." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}

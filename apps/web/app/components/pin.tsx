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

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateNonExistingPin } from "@/actions/account/update-account";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  pin: z.string().length(6),
});

// check if there is no pin then make a new pin
export default function CheckPin({ pin }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });
  const maxLength = 6;
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await updateNonExistingPin(data.pin);
    if (result.success) {
      toast({
        title: "Successfully Created",
        description: "The PIN number created successfully.",
        variant: "success",
      });
    }
  };

  return (
    <>
      <AlertDialog open={!pin && !form.formState.isSubmitSuccessful}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter your 6 PIN</AlertDialogTitle>
            <AlertDialogDescription>
              This will create a pin for this account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create PIN number</FormLabel>
                    <FormControl>
                      <div className="m-auto">
                        <InputOTP
                          maxLength={maxLength}
                          pattern={REGEXP_ONLY_DIGITS}
                          disabled={form.formState.isSubmitting}
                          {...field}
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
                      </div>
                    </FormControl>
                    <FormDescription>
                      This will be used for authentication.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.isSubmitting && <Loader2 className="animate-spin m-auto" />}
            </form>
          </Form>

          <AlertDialogFooter className="!justify-center"></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={
          form.watch("pin").length == maxLength &&
          !form.formState.isSubmitting &&
          !form.formState.isSubmitSuccessful
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remember the PIN number!</AlertDialogTitle>
            <AlertDialogDescription>
              Please make sure you remember the PIN code.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => form.setValue("pin", "")}>
              Reset
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={form.handleSubmit(onSubmit)}>Create PIN</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

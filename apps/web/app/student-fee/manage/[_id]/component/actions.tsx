"use client";
import { updateStudentFeeAmount } from "@/actions/student-fee/update-student-fee";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ellipsis, HandCoins, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ActionsStudentFees({ assessment, _id }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-2" onClick={() => setOpen(true)}>
            <HandCoins size={16} />
            Pay
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {PayAmountAlert(open, setOpen, _id, assessment)}
    </>
  );
}

const formSchema = z.object({
  amount: z.string().min(1, "Missing required field."),
});

function PayAmountAlert(open: boolean, setOpen, _id: string, assessment) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (Number(data.amount) < 1) {
      toast({
        variant: "destructive",
        title: "Amount cannot be less than 0.",
      });
      return;
    }
    const result = await updateStudentFeeAmount(
      _id,
      assessment._id,
      Number(data.amount)
    );
    if (result.success) {
      toast({
        variant: "success",
        title: result.message,
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pay Amount</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the amount that will decrease the balance of a
                    specific fee.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {form.formState.isSubmitting && (
          <Loader2 className="animate-spin m-auto" />
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await form.handleSubmit(onSubmit)();
              setOpen(false);
            }}
          >
            Pay Amount
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

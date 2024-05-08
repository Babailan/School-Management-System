"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import { Ellipsis, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { deleteDocumentAction } from "@/actions/documents/delete-documents";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTuitionActionById } from "@/actions/tuition/delete-tuition";
import { useToast } from "@/components/ui/use-toast";

const DeleteFormSchema = z.object({
  pin: z.string(),
});

export default function TuitionEllipsis({ tuition }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const form_delete = useForm<z.infer<typeof DeleteFormSchema>>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-4">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/tuition/edit/" + tuition._id}>
            <DropdownMenuItem className="gap-2">
              <Pencil size={16} />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {AlertDelete(deleteOpen, form_delete, setDeleteOpen, tuition)}
    </>
  );
}
function AlertDelete(deleteOpen: boolean, form_delete, setDeleteOpen, tuition) {
  const { toast } = useToast();

  const deleteDocumentSubmit = async (
    data: z.infer<typeof DeleteFormSchema>
  ) => {
    const result = await deleteTuitionActionById(data.pin, tuition._id);

    if (result.success) {
      toast({
        variant: "success",
        title: "Tuition Deleted",
      });
    } else {
      toast({
        variant: "destructive",
        title: result.message,
      });
    }
    setDeleteOpen(false);
  };
  return (
    <AlertDialog open={deleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete tuition
            fee.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form_delete}>
          <form className="m-auto">
            <FormField
              control={form_delete.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      onChange={async (pin) => {
                        field.onChange(pin);
                        if (pin.length == 6) {
                          await form_delete.handleSubmit(
                            deleteDocumentSubmit
                          )();
                        }
                      }}
                    >
                      <InputOTPGroup className="m-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the your pin to delete this document.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteOpen(false)}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

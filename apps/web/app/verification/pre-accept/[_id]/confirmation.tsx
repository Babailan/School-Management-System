import { DialogTuition } from "@/components/dialog/DialogTuition";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import numeral from "numeral";
import { DialogSection } from "@/components/dialog/DialogSection";
import { SelectSemester } from "@/components/select";
import { updateVerifiedStudent } from "@/actions/verification/update-verification";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  tuition: z.string()
    .min(1, "Missing required field"),
  section: z
    .object(
      {
        _id: z.string(),
        section_name: z.string(),
      },
      {
        required_error: "Section is required",
      }
    )
    .passthrough(),
});

export default function Confirmation({ data, currentStep, goToPrevStep }) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tuition: "",
      section: undefined,
    },
  });

  const submit = async () => {
    const valid = await form.trigger();
    if (valid) {
      form.handleSubmit(async (formData) => {
        try {
          const result = await updateVerifiedStudent(formData, data._id);
          if (result.success) {
            toast({
              variant: "success",
              title: "Successful",
              description: "The student has been verified.",
            });
            router.push("/verification");
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong.",
          });
        }
      })();
    }
  };

  return (
    <div className={cn(currentStep == 2 ? "flex gap-5 flex-col" : "hidden")}>
      <div>
        <h1 className="text-2xl font-bold">Enrollment Confirmation</h1>
      </div>
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="tuition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tuition Fee <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <DialogTuition
                    onTuitionSelected={(tuition) => {
                      field.onChange(tuition.amount.toString());
                    }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="justify-between gap-2"
                    >
                      {field.value
                        ? "PHP " + numeral(field.value).format("0,")
                        : "Select Tuition"}
                      <ChevronDown size={16} />
                    </Button>
                  </DialogTuition>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Section <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <DialogSection
                    onSectionSelected={(section) => {
                      field.onChange(section);
                    }}
                  >
                    <Button
                      type="button"
                      className="justify-between gap-2"
                      variant="outline"
                    >
                      {field.value?.section_name.toUpperCase() ??
                        "Select Section"}
                      <ChevronDown size={16} />
                    </Button>
                  </DialogSection>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-x-2">
            <Button
              type="button"
              onClick={goToPrevStep}
              disabled={form.formState.isSubmitting}
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous Page
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="gap-2"
                  type="button"
                  disabled={form.formState.isSubmitting}
                >
                  <Check size={16} /> Confirm Enrollment
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={submit}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}

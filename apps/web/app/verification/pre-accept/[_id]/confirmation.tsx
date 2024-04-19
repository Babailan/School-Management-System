import { DialogTuition } from "@/components/dialog/DialogTuition";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import numeral from "numeral";
import { DialogSection } from "@/components/dialog/DialogSection";
import { SelectSemester } from "@/components/select";
import { updateVerifiedStudent } from "@/actions/verification/update-verification";

const schema = z.object({
  tuition: z.string().min(1, "Tuition is required"),
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
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tuition: "",
      section: undefined,
    },
  });

  const submit = async (formData) => {
    await updateVerifiedStudent(formData, data._id);
  };

  return (
    <div className={cn(currentStep == 2 ? "flex gap-5 flex-col" : "hidden")}>
      <div>
        <h1 className="text-2xl font-bold">Enrollment Confirmation</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
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
                        : "Select Tuition"}{" "}
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
            <Button type="button" onClick={goToPrevStep} disabled={form.formState.isSubmitting}>
              <ArrowLeft size={16} className="mr-2" />
              Previous Page
            </Button>
            <Button className="gap-2" type="submit" disabled={form.formState.isSubmitting}>
              <Check size={16} /> Confirm Enrollment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

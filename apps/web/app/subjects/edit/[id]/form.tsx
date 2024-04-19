"use client";
import { updateSubjectById } from "@/actions/subject/update-subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileIcon } from "@radix-ui/react-icons";
import { Box, Button, Text, TextFieldInput } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  subjectName: z.string().min(1, "Subject name is required"),
  subjectCode: z.string().min(1, "Subject code is required"),
});

export default function Form({ data }) {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subjectName: (data.subjectName as string) ?? "",
      subjectCode: (data.subjectCode as string) ?? "",
    },
  });
  const onSubmit = async (payload) => {
    const _id = data._id;
    const result = await updateSubjectById(_id, payload);
    if (result.success) {
      return toast.success(result.message);
    } else {
      return toast.error(result.message);
    }
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Box className="space-y-2">
        <Box>
          <label>Subject Code</label>
          <TextFieldInput
            className="uppercase"
            {...register("subjectCode")}
          ></TextFieldInput>
          <Text color="red">{formState.errors.subjectCode?.message}</Text>
        </Box>
        <Box>
          <label>Subject Name</label>
          <TextFieldInput
            className="uppercase"
            {...register("subjectName")}
          ></TextFieldInput>
          <Text color="red">{formState.errors.subjectName?.message}</Text>
        </Box>
      </Box>
      <Button disabled={formState.isSubmitting}>
        <FileIcon />
        Save
      </Button>
    </form>
  );
}

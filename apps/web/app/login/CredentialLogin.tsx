"use client";
import { LoginAccountAction } from "@/actions/account/login-account";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Text,
  TextField,
  Link as RadixLink,
  Button,
} from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, "Please enter a email address.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter a password."),
});

export default function CredientialLogin() {
  const { handleSubmit, register, formState } = useForm({
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
      toast.error(result.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(login)} className="space-y-5 w-full">
      <Flex direction="column" gap="2">
        <Box>
          <Text weight={"medium"}>Email</Text>
          <TextField.Root>
            <TextField.Slot pl="3">
              <EnvelopeClosedIcon />
            </TextField.Slot>
            <TextField.Input
              size={"3"}
              color="indigo"
              {...register("email")}
              placeholder="Enter your email"
            ></TextField.Input>
          </TextField.Root>
          <Text size="2" color="red">
            {formState.errors.email?.message}
          </Text>
        </Box>
        <Box>
          <Text weight={"medium"}>Password</Text>
          <TextField.Root>
            <TextField.Slot pl="3">
              <LockClosedIcon />
            </TextField.Slot>
            <TextField.Input
              type="password"
              size={"3"}
              color={formState.errors.password?.message ? "red" : "indigo"}
              {...register("password")}
              placeholder="Enter your password"
              // variant="soft"
            ></TextField.Input>
          </TextField.Root>
          <Text size="2" color="red">
            {formState.errors.password?.message}
          </Text>
        </Box>
        <Flex justify="end">
          <Link href={"#"} legacyBehavior passHref>
            <RadixLink>Forget Password?</RadixLink>
          </Link>
        </Flex>
        <LoginButton pending={formState.isLoading} />
      </Flex>
    </form>
  );
}

function LoginButton({ pending }) {
  return (
    <Button
      size="3"
      disabled={pending}
      type="submit"
      className={`${
        pending ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
      }`}
    >
      {pending ? "Logging in...." : "Log in"}
    </Button>
  );
}

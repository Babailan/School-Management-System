"use client";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Text,
  TextField,
  Link as RadixLink,
  Button,
} from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

export default function CredientialLogin() {
  const router = useRouter();

  const login = async (formData: FormData) => {
    const test = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/",
      redirect: false,
    });
    if (test?.ok) {
      router.refresh();
    }
    if (test?.error) {
      toast.error(test.error);
    }
  };
  return (
    <form action={login} className="space-y-5 w-full">
      <Flex direction="column" gap="5">
        <Box>
          <Text weight={"medium"}>Email</Text>
          <TextField.Root>
            <TextField.Slot pl="3">
              <EnvelopeClosedIcon />
            </TextField.Slot>
            <TextField.Input
              size={"3"}
              color="indigo"
              name="email"
              placeholder="Enter your email"
            ></TextField.Input>
          </TextField.Root>
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
              color="indigo"
              name="password"
              placeholder="Enter your password"
            ></TextField.Input>
          </TextField.Root>
        </Box>
        <Flex justify="end">
          <Link href={"#"} legacyBehavior passHref>
            <RadixLink>Forget Password?</RadixLink>
          </Link>
        </Flex>
        <LoginButton />
      </Flex>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

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

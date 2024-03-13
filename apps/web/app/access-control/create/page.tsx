"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Separator,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  middlename: z.string().min(1, { message: "Middle name is required" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
  faculty: z.boolean(),
  registrar: z.boolean(),
  administrator: z.boolean(),
});

export default function CreateUser() {
  const { formState, handleSubmit, register, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "Ronnel",
      lastname: "Babailan",
      middlename: "Dilao",
      email: "Babailanxx@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      faculty: false,
      registrar: false,
      administrator: false,
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading>Creating a user</Heading>
        <Text color="gray">
          This page is only accessible to the admin user. If you think this is a
          mistake, please contact the administrator.
        </Text>
      </Flex>
      <form className="space-y-2 max-w-96" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={"2"} wrap="wrap" className="*:flex-grow">
          <Box>
            <label>First Name</label>
            <TextField.Input {...register("firstname")}></TextField.Input>
            <Text color="red">{formState.errors.firstname?.message}</Text>
          </Box>
          <Box>
            <label>Last Name</label>
            <TextField.Input {...register("lastname")}></TextField.Input>
            <Text color="red">{formState.errors.lastname?.message}</Text>
          </Box>
          <Box>
            <label>Middle Name</label>
            <TextField.Input {...register("middlename")}></TextField.Input>
            <Text color="red">{formState.errors.middlename?.message}</Text>
          </Box>
        </Flex>

        <Box>
          <label>Email</label>
          <TextField.Root>
            <TextField.Slot>
              <EnvelopeClosedIcon />
            </TextField.Slot>
            <TextField.Input {...register("email")}></TextField.Input>
          </TextField.Root>
          <Text color="red">{formState.errors.email?.message}</Text>
        </Box>
        <Box>
          <label>Password</label>
          <TextField.Root>
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
            <TextField.Input {...register("confirmPassword")}></TextField.Input>
          </TextField.Root>
          <Text color="red">{formState.errors.password?.message}</Text>
        </Box>
        <Box>
          <label>Confirm Password</label>
          <TextField.Root>
            <TextField.Slot>
              <LockClosedIcon />
            </TextField.Slot>
            <TextField.Input {...register("confirmPassword")}></TextField.Input>
          </TextField.Root>
          <Text color="red">{formState.errors.confirmPassword?.message}</Text>
        </Box>
        <Separator size="4" />
        <Box>
          <Heading size="4">Role</Heading>

          <Tooltip content="(of authority or an office, or someone holding it) superior to all others.">
            <Flex align="center" gap="2">
              <Checkbox
                size="1"
                onCheckedChange={(checkState) =>
                  setValue("faculty", !!checkState)
                }
              ></Checkbox>
              <Flex align="center" gap="1">
                <Text size="2">Administrator</Text>
              </Flex>
            </Flex>
          </Tooltip>
          <Tooltip content="The registrar maintains student records.">
            <Flex align="center" gap="2">
              <Checkbox
                size="1"
                onCheckedChange={(checkState) =>
                  setValue("registrar", !!checkState)
                }
              ></Checkbox>
              <Flex align="center" gap="1">
                <Text size="2">Registrar</Text>
              </Flex>
            </Flex>
          </Tooltip>
          <Tooltip content="The faculty records the student data and assign grades.">
            <Flex align="center" gap="2" className="w-fit">
              <Checkbox
                onCheckedChange={(checkState) =>
                  setValue("faculty", !!checkState)
                }
                size="1"
              ></Checkbox>
              <Flex align="center" gap="1">
                <Text size="2">Faculty</Text>
              </Flex>
            </Flex>
          </Tooltip>
        </Box>

        <Button>
          <EnvelopeClosedIcon />
          Create User
        </Button>
      </form>
    </Box>
  );
}

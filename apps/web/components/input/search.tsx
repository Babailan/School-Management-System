"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";

type InputFieldProps = ComponentPropsWithoutRef<typeof TextField.Input>;

export default function SearchInput({ ...props }: InputFieldProps) {
  return (
    <TextField.Root>
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
      <TextField.Input {...props}></TextField.Input>
    </TextField.Root>
  );
}

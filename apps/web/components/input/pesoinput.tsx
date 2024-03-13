"use client";
import { TextField } from "@radix-ui/themes";
import PesoSign from "../../icon/peso";
import { ChangeEvent, ComponentPropsWithoutRef } from "react";

type TextFieldInput = ComponentPropsWithoutRef<typeof TextField.Input>;

export default function PesoInput({ onChange, ...props }: TextFieldInput) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <TextField.Root>
      <TextField.Slot>
        <PesoSign />
      </TextField.Slot>
      <TextField.Input onChange={handleChange} {...props}></TextField.Input>
    </TextField.Root>
  );
}

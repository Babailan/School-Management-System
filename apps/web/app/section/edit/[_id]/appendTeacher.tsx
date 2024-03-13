"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Dialog, Button } from "@radix-ui/themes";

export default function () {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="surface" className="hover:cursor-pointer">
          <PlusCircledIcon />
          Append
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Append Teacher</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to sections profile.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}

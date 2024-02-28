"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button className="w-full" onClick={() => signOut()}>
      <ExitIcon />
      Log Out
    </Button>
  );
}

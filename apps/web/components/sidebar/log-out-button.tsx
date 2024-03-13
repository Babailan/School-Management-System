"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function () {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const logOut = () => {
    removeCookie("user_token");
    router.refresh();
  };
  return (
    <Button className="w-full" onClick={logOut}>
      <ExitIcon />
      Log Out
    </Button>
  );
}

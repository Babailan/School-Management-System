"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function UserRedirection({ children }) {
  const router = useRouter();

  const [userToken] = useLocalStorage("userToken", "");

  useEffect(() => {
    if (userToken == "") {
      router.push("/login");
    }
  }, [userToken]);
  return <>{children}</>;
}

"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";

export default function AuthenticatorComponent({ children }) {
  const token = useReadLocalStorage("userToken");
  const router = useRouter();

  useEffect(() => {
    if (token == "") {
      router.push("/login");
    }
  }, [token]);

  return <Suspense>{children}</Suspense>;
}

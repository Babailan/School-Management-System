"use client";

import {
  Box,
  Button,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Logo from "../../assets/logo.jpg";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const authenticate = await fetch("http://localhost:3001/api/login", {
        body: JSON.stringify({ email, password }),
        method: "POST",
      });

      const result = await authenticate.json();
      if (result.success) {
        setUserToken(JSON.stringify(result));
        router.push("/");
      }
    } catch (error) {}
  };
  return (
    <ScrollArea>
      <main className="w-full h-screen flex flex-col items-center py-10">
        <div className="max-w-sm w-full text-gray-600 space-y-5">
          <div className="text-center pb-8">
            <Image src={Logo} className="mx-auto max-w-52" alt={""} />
            <div className="mt-5">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Log in to your account
              </h3>
            </div>
          </div>
          <Box className="space-y-5">
            <Box>
              <Text className="font-medium">Email</Text>
              <TextField.Input
                size={"3"}
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <Text className="font-medium">Password</Text>
              <TextField.Input
                size={"3"}
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Flex justify={"end"}>
              <Text className="cursor-pointer" color="indigo">
                Forget Password?
              </Text>
            </Flex>
            <Button
              onClick={signin}
              className="w-full hover:cursor-pointer"
              size={"3"}
            >
              Sign in
            </Button>
          </Box>
        </div>
      </main>
    </ScrollArea>
  );
}

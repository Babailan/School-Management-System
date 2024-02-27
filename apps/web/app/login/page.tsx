"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Link as RadixLink,
  Quote,
  Text,
  TextFieldRoot,
  TextFieldInput,
  TextFieldSlot,
} from "@radix-ui/themes";
import React from "react";
import WhiteYascLogo from "../../assets/white_yasc_logo.png";
import BlackYascLogo from "../../assets/black_yasc_logo.png";
import Image from "next/image";
import Link from "next/link";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

export default function Page() {
  const quotes = [
    {
      quote:
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
      author: "Steve Jobs",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote:
        "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
      author: "Oprah Winfrey",
    },
    {
      quote:
        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      author: "James Cameron",
    },
    {
      quote:
        "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
      author: "John Lennon",
    },
  ];

  const login = async (formData: FormData) => {
    const test = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log(test);
  };

  return (
    <Flex className="w-full flex">
      <Box className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <Box className="relative z-10 w-full max-w-md">
          <Image src={WhiteYascLogo} width={150} alt={"Logo"} quality={2} />
          <Box className="space-y-5">
            <Heading className="text-white">
              Start your journey at Young Achievers School Of Caloocan
            </Heading>
            <Box>
              <Text size="3">
                <Quote className="!text-white"></Quote>
                <Text className="text-white whitespace-nowrap"></Text>
              </Text>
            </Box>

            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5.000+ users
              </p>
            </div>
          </Box>
        </Box>
        <Box
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></Box>
      </Box>
      <Box className="flex-1 flex items-center justify-center h-screen">
        <Box className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <Box className="">
            <Image src={BlackYascLogo} width={150} alt={"Logo"} quality={2} />
            <Box mt="5" className="space-y-2">
              <Heading>Log in</Heading>
              <Text as="p">Fill all the requirements to continue.</Text>
            </Box>
          </Box>
          <form action={login} className="space-y-5">
            <Flex direction="column" gap="5">
              <Box>
                <Text weight={"medium"}>Email</Text>
                <TextFieldRoot>
                  <TextFieldSlot pl="3">
                    <EnvelopeClosedIcon />
                  </TextFieldSlot>
                  <TextFieldInput
                    size={"3"}
                    color="indigo"
                    name="email"
                    placeholder="Enter your email"
                  ></TextFieldInput>
                </TextFieldRoot>
              </Box>
              <Box>
                <Text weight={"medium"}>Password</Text>
                <TextFieldRoot>
                  <TextFieldSlot pl="3">
                    <LockClosedIcon />
                  </TextFieldSlot>
                  <TextFieldInput
                    type="password"
                    size={"3"}
                    color="indigo"
                    name="password"
                    placeholder="Enter your password"
                  ></TextFieldInput>
                </TextFieldRoot>
              </Box>
              <Flex justify="end">
                <Link href={"#"} legacyBehavior passHref>
                  <RadixLink>Forget Password?</RadixLink>
                </Link>
              </Flex>
              <Button size="3" className="hover:cursor-pointer">
                Log in
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

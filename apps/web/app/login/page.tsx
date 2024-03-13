import { Box, Flex, Heading, Quote, Text, Separator } from "@radix-ui/themes";
import React from "react";
import WhiteYascLogo from "../../assets/white_yasc_logo.png";
import BlackYascLogo from "../../assets/black_yasc_logo.png";
import Image from "next/image";
import Facebook from "@/icon/facebook";
import CredientialLogin from "./CredentialLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YASCI - Login Page",
};

export default async function Page() {
  return (
    <Flex className="w-full flex">
      <Box className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <Box className="relative z-10 w-full max-w-md">
          <Image src={WhiteYascLogo} width={150} alt={"Logo"} quality={2} />
          <Box className="space-y-5">
            <Heading className="text-white">
              Young Achiever's School of Caloocan INC
            </Heading>
            <Box>
              <Text size="3">
                <Quote className="!text-white">
                  I trust people to act according to their nature. Anything more
                  is sentimentality.
                </Quote>
                <Text className="text-white whitespace-nowrap">
                  – Dread Empress Malicia the First
                </Text>
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
          <Box>
            <Image
              src={BlackYascLogo}
              className="lg:hidden"
              width={150}
              alt={"Logo"}
              quality={2}
            />
            <Flex justify="center" gap="5" align="center" direction="column">
              <Heading>Log in to your account</Heading>
              <Flex justify="center" align="center" gap="2" width="100%">
                <Separator size="4" orientation="horizontal" />
                <Text className="whitespace-nowrap">Or continue with</Text>
                <Separator size="4" orientation="horizontal" />
              </Flex>
              <button className="w-full border p-3 rounded-md shadow-sm">
                <Flex align="center" gap="2" justify="center">
                  <Facebook width={25} height={25} className="fill-blue-700" />
                  <Text size="2" weight="medium">
                    Continue with facebook
                  </Text>
                </Flex>
              </button>
              <CredientialLogin />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

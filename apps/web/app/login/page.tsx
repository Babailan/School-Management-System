import React from "react";
import CredientialLogin from "./CredentialLogin";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Command, LucideFacebook } from "lucide-react";
import { TypographyH3 } from "@/components/typography/h3";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "YASCI - Login Page",
};

export default async function Page() {
  return (
    <div className="w-full flex">
      <div className="flex-1 hidden h-screen lg:flex p-6">
        <Command />
        <span className="ml-2">School Management System</span>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
          <TypographyH3 className="text-center">
            Log in to your account
          </TypographyH3>
          <div className="flex justify-center items-center gap-5">
            <div className="w-full">
              <Separator />
            </div>
            <span className="whitespace-nowrap">OR CONTINUE WITH</span>
            <div className="w-full">
              <Separator />
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            <LucideFacebook className="w-5 h-5 mr-2" />
            Continue with facebook
          </Button>
          <CredientialLogin />
        </div>
      </div>
    </div>
  );
}

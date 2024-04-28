import React from "react";
import CredientialLogin from "./CredentialLogin";
import { Command, LucideFacebook } from "lucide-react";
import { TypographyH3 } from "@/components/typography/h3";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import HarvardImage from "./harvard_image.png";
import { getAuth } from "@/lib/crypto/getAuth";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await getAuth();
  if (auth) {
    redirect("/");
  }
  return (
    <div className="flex *:w-full">
      <div className="hidden min-h-screen lg:block p-6 border-r space-y-5">
        <div className="flex gap-2">
          <Command />
          <span>School Management System</span>
        </div>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            fill
            src={HarvardImage}
            alt="Photo by Drew Beamer"
            className="object-cover rounded-sm"
            sizes="100vw"
          />
        </AspectRatio>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is School Management System?
            </AccordionTrigger>
            <AccordionContent>
              Software applications that help schools to streamline their
              operations and improve efficiency. SMS can be used to track
              student information, manage attendance, grade assignments, and
              communicate with parents.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>My favorite quotes</AccordionTrigger>
            <AccordionContent>
              I think, therefore I am. (Latin: Cogito, ergo sum) is a
              philosophical statement by René Descartes
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
          <TypographyH3 className="text-center">
            Log in to your account
          </TypographyH3>
          <CredientialLogin />
        </div>
      </div>
    </div>
  );
}

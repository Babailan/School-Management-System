"use client";

import { z } from "zod";
import React from "react";
import { useStep } from "usehooks-ts";
import _ from "lodash";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Confirmation from "./confirmation";
import InformationVerificationPage from "./information_page";

const schema = z.object({
  lrn: z.string().min(1, "LRN is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  middleName: z.string().min(1, "Middle Name is required"),
  address: z.string().min(1, "Address is required"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  phone: z.string().min(1, "Phone Number is required"),
  guardian: z.string().min(1, "Guardian Name is required"),
  strand: z.string().min(1, "Strand is required"),
  year: z.string().min(1, "Year is required"),
  gradeLevel: z.string().min(1, "Grade Level is required"),
  birthday: z.string().min(1, "Birthday is required"),
  documents: z.array(z.string()),
  sex: z.enum(["male", "female"]),
});

const steps = [
  {
    label: "Personal Information",
  },
  {
    label: "Enrollment Confirmation",
  },
];

export default function EditVerificationForm({ data, documents }) {
  const [currentStep, helpers] = useStep(steps.length);

  const { goToNextStep, goToPrevStep } = helpers;

  return (
    <div className="space-y-5">
      <nav className="flex gap-5 justify-center items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col justify-center items-center">
              <span
                className={cn(
                  currentStep == index + 1 ? "border-primary" : "",
                  "border size-10 flex items-center justify-center rounded-full"
                )}
              >
                {index + 1}
              </span>
              <span>{step.label}</span>
            </div>
            {index != steps.length - 1 && (
              <Separator className="flex-1 max-w-96" />
            )}
          </React.Fragment>
        ))}
      </nav>
      <InformationVerificationPage
        goToNextStep={goToNextStep}
        data={data}
        currentStep={currentStep}
        documents={documents}
      />
      <Confirmation
        goToPrevStep={goToPrevStep}
        currentStep={currentStep}
        data={data}
      />
    </div>
  );
}

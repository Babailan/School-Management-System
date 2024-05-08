"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";
import { useStep } from "usehooks-ts";
import Confirmation from "./confirmation";
import InformationVerificationPage from "./information_page";



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

"use client";
import { CircleAlert, Command } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AddStudentsForm from "./components/form";

export default function Home() {
  return (
    <div className="mx-auto  max-w-4xl">
      <main className="p-5 md:p-10">
        <div className="flex gap-2">
          <Command />
          <span className="font-semibold">SMS Enrollment</span>
        </div>
        <Alert className="mt-4">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Notice!</AlertTitle>
          <AlertDescription>
            After submitting the form, proceed to the registrar&apos;s office
            for the enrollment process.
          </AlertDescription>
        </Alert>
        <AddStudentsForm />
      </main>
    </div>
  );
}

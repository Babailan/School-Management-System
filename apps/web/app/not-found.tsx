import { Heading, Text, Flex, Box } from "@radix-ui/themes";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen flex-col flex justify-center items-center">
      <h1 className="text-2xl font-bold flex gap-2 items-center">
        Page not found <Frown />
      </h1>
      <p className="text-center">
        Sorry, the page you are looking for could not be found or has been
        removed.
      </p>
    </div>
  );
}

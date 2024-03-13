import AddSubjectAction from "@/actions/subject/add-subject";
import Loading from "@/app/loading";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Text,
  Flex,
  Heading,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
} from "@radix-ui/themes";
import { Metadata } from "next";
import { Suspense } from "react";
import AddSubjectForm from "./addSubjectForm";

export const metadata: Metadata = {
  title: "YASCI - Add subject",
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Box p={"6"} className="space-y-5">
        <Flex direction="column">
          <Heading>Subject Information</Heading>
          <Text size="2" color="gray">
            Subject that the student will use in their profile.
          </Text>
        </Flex>
        <CalloutRoot>
          <CalloutIcon>
            <InfoCircledIcon />
          </CalloutIcon>
          <CalloutText>
            Make sure all the information provided are correct.
          </CalloutText>
        </CalloutRoot>
        <AddSubjectForm />
      </Box>
    </Suspense>
  );
}

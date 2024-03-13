import {
  Box,
  Text,
  CalloutRoot,
  CalloutIcon,
  CalloutText,
  Heading,
  Flex,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { Suspense } from "react";
import Loading from "@/app/loading";
import FormAddCurriculum from "./form_add";

export default function CurriculumAdd() {
  return (
    <Suspense fallback={<Loading />}>
      <Box className="space-y-2" p="6">
        <Flex direction="column">
          <Heading>Curriculum Information</Heading>
          <Text size="2" color="gray">
            Create a curriculums for the school
          </Text>
        </Flex>
        <CalloutRoot>
          <CalloutIcon>
            <InfoCircledIcon />
          </CalloutIcon>
          <CalloutText>
            Curriculum is used when structuring a section.
          </CalloutText>
        </CalloutRoot>
        <FormAddCurriculum />
      </Box>
    </Suspense>
  );
}

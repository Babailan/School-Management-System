import {
  Box,
  Callout,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  Strong,
  Text,
} from "@radix-ui/themes";
import { getSubjectByIdAction } from "@/actions/subject/get-subject";
import Form from "./form";
import NotFound from "@/app/not-found";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default async function EditSubject({ params: { id } }) {
  const data = await getSubjectByIdAction(id);

  return (
    <Box p="6" className="space-y-5">
      <CalloutRoot>
        <CalloutIcon>
          <InfoCircledIcon />
        </CalloutIcon>
        <CalloutText>
          <Strong>Notice : </Strong>
          When you edit a subject, it will be only for curriculum but not the
          sections that are already made.
        </CalloutText>
      </CalloutRoot>
      <Flex direction={"column"}>
        <Heading>Editing a subject</Heading>
        <Text color="gray">You can edit the subject here</Text>
      </Flex>
      <Form data={data} />
    </Box>
  );
}

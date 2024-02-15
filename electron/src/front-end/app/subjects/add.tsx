import { CheckIcon } from "@radix-ui/react-icons";
import {
  Box,
  Heading,
  Text,
  TextField,
  AlertDialog,
  Button,
  Flex,
  Strong,
} from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddSubjectPage() {
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = async () => {
    const req = await fetch("http://localhost:3001/api/add-subject", {
      body: JSON.stringify({ subjectCode, subjectName }),
      method: "POST",
    });
    const result = await req.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Box className="space-y-5" p={"3"}>
      <Box>
        <Text size="3" weight="bold">
          Subject Information
        </Text>
        <Box className="space-y-2">
          <Box>
            <Text size="2" color="gray">
              Subject Code
            </Text>
            <TextField.Input
              required
              className="uppercase"
              onChange={(e) => setSubjectCode(e.target.value)}
            ></TextField.Input>
          </Box>
          <Box>
            <Text size="2" color="gray">
              Subject Name
            </Text>
            <TextField.Input
              required
              className="uppercase"
              onChange={(e) => setSubjectName(e.target.value)}
            ></TextField.Input>
          </Box>
        </Box>
      </Box>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Box width={"max-content"}>
            <Button color="green" className="hover:cursor-pointer">
              <CheckIcon />
              Approve
            </Button>
          </Box>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>New Subject</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure?
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Box>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Box>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Box>
                <Button variant="solid" color="green" onClick={handleSubmit}>
                  Confirm
                </Button>
              </Box>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
}

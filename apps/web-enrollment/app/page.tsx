import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Container,
  Flex,
  Text,
  TextFieldInput,
  CalloutRoot,
  CalloutText,
  CalloutIcon,
  Button,
  Checkbox,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <Container size="2" p={"9"}>
      <Box className="space-y-2">
        <Image src={"/logo.png"} alt="Logo" width={400} height={150}></Image>
        <CalloutRoot>
          <CalloutIcon>
            <InfoCircledIcon />
          </CalloutIcon>
          <CalloutText>
            After submitting the form successfully, kindly proceed to the
            school's cashier.
          </CalloutText>
        </CalloutRoot>
        <Flex gap="2" className="[&>*]:w-full">
          <Box>
            <Text size="2" color="gray">
              First Name
            </Text>
            <TextFieldInput></TextFieldInput>
          </Box>
          <Box>
            <Text size="2" color="gray">
              Middle Name
            </Text>
            <TextFieldInput></TextFieldInput>
          </Box>
          <Box>
            <Text size="2" color="gray">
              Last Name
            </Text>
            <TextFieldInput></TextFieldInput>
          </Box>
        </Flex>
        <Box>
          <Text size="2" color="gray">
            Address
          </Text>
          <TextFieldInput></TextFieldInput>
        </Box>
        <Box>
          <Text size="2" color="gray">
            Contact Number
          </Text>
          <TextFieldInput></TextFieldInput>
        </Box>
        <Box>
          <Text size="2" color="gray">
            Email
          </Text>
          <TextFieldInput></TextFieldInput>
        </Box>
        <Flex direction="column">
          <Text size="2" color="gray">
            Sex
          </Text>
          <SelectRoot>
            <SelectTrigger placeholder="Select Your Sex"></SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </SelectRoot>
        </Flex>
        <Flex direction="column">
          <Text size="2" color="gray">
            Sex
          </Text>
          <SelectRoot>
            <SelectTrigger placeholder="Select Your Sex"></SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </SelectRoot>
        </Flex>
        <Flex direction="column">
          <Text size="2" color="gray">
            Sex
          </Text>
          <SelectRoot>
            <SelectTrigger placeholder="Select Your Sex"></SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </SelectRoot>
        </Flex>
        <Flex align="center">
          <Checkbox mr="3" />
          <Text size="2">I agree to the terms and conditions</Text>
        </Flex>
        <Button className="hover:cursor-pointer w-full" size="3">
          Submit
        </Button>
      </Box>
    </Container>
  );
}

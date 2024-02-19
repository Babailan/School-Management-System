import { Heading, Text, Flex, Box } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      p={{
        initial: "4",
        md: "6",
      }}
      className="h-screen"
    >
      <Box>
        <Heading size={"8"} className="text-center">
          Page not found
        </Heading>
        <Text className="text-center" as="div">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </Text>
      </Box>
    </Flex>
  );
}

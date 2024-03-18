"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Flex
      direction="column"
      height={"100%"}
      justify={"center"}
      align="center"
      gap="5"
    >
      <Flex direction="column">
        <Heading size="8" align="center">
          {error.message}
        </Heading>
        <Text color="gray" align="center">
          Sorry, the page you are looking for could not be found or has been
          <br />
          removed.
        </Text>
      </Flex>
      <Flex gap={"2"}>
        <Button onClick={reset} color="blue">
          Try again
        </Button>
        <Button color="gray">Contact Support</Button>
      </Flex>
    </Flex>
  );
}

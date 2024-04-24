import { getSubjectSearchAction } from "@/actions/subject/get-subject";
import { CaretDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Inset,
  Popover,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

/**
 * SelectSubject component.
 * Renders a select subject component with a search functionality.
 *
 * @component
 * @param {Function} onClick - Callback function triggered when a subject is clicked.
 * @returns {JSX.Element} SelectSubject component.
 */
const SelectSubject: React.FC<{ onClick?: (subject: object) => void }> = ({
  onClick,
}) => {
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: async (query: string) =>
      await getSubjectSearchAction(1, query, 0),
  });
  return (
    <Popover.Root onOpenChange={() => mutate("")}>
      <Popover.Trigger>
        <Box display="inline">
          <Button>
            <MagnifyingGlassIcon />
            Search Subject
          </Button>
        </Box>
      </Popover.Trigger>
      <Popover.Content align="start">
        <Inset>
          <ScrollArea className="max-h-60 p-2">
            <Box className="w-96">
              <Flex gap="2" direction={"column"}>
                <Box>
                  <TextField.Root size="3">
                    <TextField.Slot>
                      <MagnifyingGlassIcon />
                    </TextField.Slot>
                    <TextField.Input
                      placeholder="Search for subject"
                      onChange={(e) => mutate(e.target.value)}
                    ></TextField.Input>
                  </TextField.Root>
                </Box>
                {data?.results.map((subject, idx) => {
                  return (
                    <Popover.Close
                      className="cursor-pointer"
                      onClick={() => {
                        if (onClick) {
                          onClick(subject);
                        }
                      }}
                      key={idx}
                    >
                      <Card>
                        <Flex direction="column">
                          <Text size="2" weight="bold" className="uppercase">
                            {subject.subjectName}
                          </Text>
                          <Text size="1" color="gray" className="uppercase">
                            {subject.subjectCode}
                          </Text>
                        </Flex>
                      </Card>
                    </Popover.Close>
                  );
                })}
                {data?.results.length === 0 && (
                  <Text size="2" color="gray">
                    No results found
                  </Text>
                )}
                {isPending && <Skeleton />}
              </Flex>
            </Box>
          </ScrollArea>
        </Inset>
      </Popover.Content>
    </Popover.Root>
  );
};

export default SelectSubject;

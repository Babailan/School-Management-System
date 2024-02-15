import { CaretDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Box,
  Button,
  Flex,
  Popover,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const SelectSubject: React.FC<{ onClick: (subject: object) => void }> = ({
  onClick,
}) => {
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: async (query: string) =>
      (
        await axios.get(
          `http://localhost:3001/api/subject/search?query=${query}`
        )
      ).data,
  });
  return (
    <Popover.Root>
      <PopoverTrigger asChild>
        <Box display="inline">
          <Button variant="soft">
            Pick Subjects
            <CaretDownIcon width="16" height="16" />
          </Button>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="bg-white rounded-md"
      >
        <ScrollArea className="max-h-60">
          <Box p={"2"} className="w-96">
            <Box>
              <TextField.Root>
                <TextField.Slot>
                  <MagnifyingGlassIcon />
                </TextField.Slot>
                <TextField.Input
                  placeholder="Search for subject"
                  onChange={(e) => mutate(e.target.value)}
                ></TextField.Input>
              </TextField.Root>
            </Box>
            <Flex className="space-y-2 mt-2" direction={"column"}>
              {!isPending
                ? isError
                  ? null
                  : data?.results.map((subject) => (
                      <PopoverClose
                        key={subject._id}
                        onClick={() => onClick(subject)}
                        className="hover:bg-gray-100 p-2 text-left text-sm"
                      >
                        {subject.subjectCode} | {subject.subjectName}
                      </PopoverClose>
                    ))
                : null}
            </Flex>
          </Box>
        </ScrollArea>
      </PopoverContent>
    </Popover.Root>
  );
};

export default SelectSubject;

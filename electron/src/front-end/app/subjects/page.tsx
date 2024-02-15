"use client";

import {
  AlertDialog,
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import AddSubjectPage from "./add";
import ListSubjectPage from "./list";
import { TabsTrigger, TabsList } from "@radix-ui/react-tabs";

export default function Page() {
  return (
    <Box p={"6"}>
      <Tabs.Root defaultValue="subjects-list">
        <Tabs.List>
          <Tabs.Trigger value="subjects-list" className="hover:cursor-pointer">
            Subjects
          </Tabs.Trigger>
          <Tabs.Trigger value="add" className="hover:cursor-pointer">
            Add Subjects
          </Tabs.Trigger>
        </Tabs.List>

        <Box>
          <Tabs.Content value="subjects-list">
            <ListSubjectPage></ListSubjectPage>
          </Tabs.Content>

          <Tabs.Content value="add">
            <AddSubjectPage />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}

"use client";

import { Box, Tabs } from "@radix-ui/themes";
import CurriculumList from "./list";
import CurriculumAdd from "./add";

export default function Page() {
  return (
    <Box p="6">
      <Tabs.Root defaultValue="curriculum-list">
        <Tabs.List>
          <Tabs.Trigger
            value="curriculum-list"
            className="hover:cursor-pointer"
          >
            Curriculum List
          </Tabs.Trigger>
          <Tabs.Trigger value="add" className="hover:cursor-pointer">
            Add Curriculum
          </Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="curriculum-list">
            <CurriculumList />
          </Tabs.Content>

          <Tabs.Content value="add">
            <CurriculumAdd />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}

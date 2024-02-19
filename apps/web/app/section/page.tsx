"use client";

import { Box, Tabs, Text } from "@radix-ui/themes";
import SectionList from "./list";
import SectionAdd from "./add";

export default function Page() {
  return (
    <Box p="6">
      <Tabs.Root defaultValue="section-list">
        <Tabs.List>
          <Tabs.Trigger value="section-list">Section List</Tabs.Trigger>
          <Tabs.Trigger value="add">Add Section</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="section-list">
            <SectionList />
          </Tabs.Content>

          <Tabs.Content value="add">
            <SectionAdd />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}

"use client";

import { Box, Tabs } from "@radix-ui/themes";
import AssessmentList from "./asessment";

export default function Page() {
  return (
    <Box p="6">
      <Tabs.Root defaultValue="assessment-list">
        <Tabs.List>
          <Tabs.Trigger value="assessment-list">Assessment</Tabs.Trigger>
          <Tabs.Trigger value="enroll">Enroll</Tabs.Trigger>
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="assessment-list">
            <AssessmentList></AssessmentList>
          </Tabs.Content>

          <Tabs.Content value="enroll"></Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}

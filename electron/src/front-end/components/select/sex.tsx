import { Label } from "@radix-ui/react-label";
import { Flex, Select } from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";
import React from "react";

const SelectSex: React.FC<SelectRootProps> = ({ ...props }) => {
  return (
    <Flex gap={"2"} align={"center"}>
      <Label className="text-sm whitespace-nowrap">Sex</Label>
      <Select.Root {...props}>
        <Select.Trigger placeholder="Select Semester"></Select.Trigger>
        <Select.Content position="popper">
          <Select.Item value="female">Female</Select.Item>
          <Select.Item value="male">Male</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default SelectSex;

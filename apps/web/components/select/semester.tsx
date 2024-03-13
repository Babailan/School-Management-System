import { Label } from "@radix-ui/react-label";
import { Flex, Select } from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";
import React from "react";

const SelectSemester: React.FC<SelectRootProps> = ({ ...props }) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className="w-60"
        placeholder="Select Semester"
      ></Select.Trigger>
      <Select.Content position="popper">
        <Select.Item value="1">1st Semester</Select.Item>
        <Select.Item value="2">2nd Semester</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectSemester;

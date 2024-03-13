import { Label } from "@radix-ui/react-label";
import { Flex, Select } from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";

const SelectGradeLevel: React.FC<SelectRootProps> = ({ ...props }) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className="w-60"
        placeholder="Select Grade Level"
      ></Select.Trigger>
      <Select.Content position="popper">
        <Select.Item value="11">Grade 11 Senior High School</Select.Item>
        <Select.Item value="12">Grade 12 Senior High School</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectGradeLevel;

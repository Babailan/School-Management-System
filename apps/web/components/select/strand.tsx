import { Label } from "@radix-ui/react-label";
import { Flex, Select } from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";

const SelectStrand: React.FC<SelectRootProps> = ({ ...props }) => {
  return (
    <Flex align={"center"} gap={"2"}>
      <Label className="text-sm whitespace-nowrap">Academic Strand</Label>
      <Select.Root {...props}>
        <Select.Trigger placeholder="Select A Strand"></Select.Trigger>
        <Select.Content position="popper">
          <Select.Item value="ABM">
            Accountancy Business Management (ABM)
          </Select.Item>
          <Select.Item value="STEM">
            Science, Technology, Engineering, and Mathematics (STEM)
          </Select.Item>
          <Select.Item value="HUMSS">
            Humanities and Social Sciences (HUMSS)
          </Select.Item>
          <Select.Item value="GAS">General Academic Strand (GAS)</Select.Item>
          <Select.Item value="HE">Home Economics (HE)</Select.Item>
          <Select.Item value="ICT">
            Information and Communication Technology (ICT)
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default SelectStrand;

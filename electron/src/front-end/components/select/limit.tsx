import { Select } from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";

const SelectLimit: React.FC<SelectRootProps> = ({ ...props }) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger className="w-60" placeholder="Limit" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Limit</Select.Label>
          <Select.Item value="10">10</Select.Item>
          <Select.Item value="50">50</Select.Item>
          <Select.Item value="100">100</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectLimit;

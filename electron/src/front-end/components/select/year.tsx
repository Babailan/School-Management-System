import { Select } from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";

const SelectYear: React.FC<SelectRootProps> = ({ ...props }) => {
  const startYear = 2006;
  const currentYear = new Date().getFullYear().toString();
  const Options = () => {
    const item: any = [];
    const maximumYear = parseInt(currentYear) + 5;
    for (let i = startYear; i < maximumYear; i++) {
      item.push(
        <Select.Item value={i.toString()} key={i}>
          {i} - {i + 1}
        </Select.Item>
      );
    }
    return item;
  };

  return (
    <Select.Root {...props}>
      <Select.Trigger className="w-60" placeholder="Select A Year" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Year</Select.Label>
          <Options />
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectYear;

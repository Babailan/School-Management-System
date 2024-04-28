import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

const SelectYear = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Select>) => {
  const Options = () => {
    const currentYear = 2024;
    const item: any = [];
    const maximumYear = currentYear + 5;
    for (let i = currentYear; i < maximumYear; i++) {
      item.push(
        <SelectItem value={i.toString()} key={i}>
          {i} - {i + 1}
        </SelectItem>
      );
    }
    return item;
  };

  return (
    <Select {...props} >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <Options />
      </SelectContent>
    </Select>
  );
};

export default SelectYear;

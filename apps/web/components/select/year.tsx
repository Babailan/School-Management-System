import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectGroup,
} from "../ui/select";

const SelectYear = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Select>) => {
  const startYear = 2006;
  const currentYear = new Date().getFullYear().toString();
  const Options = () => {
    const item: any = [];
    const maximumYear = parseInt(currentYear) + 5;
    for (let i = startYear; i < maximumYear; i++) {
      item.push(
        <SelectItem value={i.toString()} key={i}>
          {i} - {i + 1}
        </SelectItem>
      );
    }
    return item;
  };

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <Options />
      </SelectContent>
    </Select>
  );
};

export default SelectYear;

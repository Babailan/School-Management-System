import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const SelectGradeLevel = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Select>) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select a grade level"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="11">Grade 11 Senior High School</SelectItem>
        <SelectItem value="12">Grade 12 Senior High School</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectGradeLevel;

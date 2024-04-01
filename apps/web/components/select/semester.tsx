import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../ui/select";

const SelectSemester = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Select>) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">1st Semester</SelectItem>
          <SelectItem value="2">2nd Semester</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectSemester;

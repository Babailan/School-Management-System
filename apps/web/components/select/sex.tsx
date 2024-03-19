import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";
import React from "react";

const SelectSex: React.FC<SelectRootProps> = (props) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Sex" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="male">Male</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectSex;

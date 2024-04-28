import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { ComponentPropsWithoutRef } from "react";

const SelectSex = ({ ...props }: ComponentPropsWithoutRef<typeof Select>) => {
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

import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@radix-ui/themes";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";
import React from "react";

const SelectSex: React.FC<SelectRootProps> = (props) => {
  return (
    <SelectRoot {...props}>
      <SelectTrigger
        className="w-full"
        placeholder="Select Sex"
      ></SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="male">Male</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
};

export default SelectSex;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ComponentPropsWithoutRef } from "react";

export default function SelectRoles({
  ...props
}: ComponentPropsWithoutRef<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Role"></SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="administrator">Administrator</SelectItem>
        <SelectItem value="faculty">Faculty</SelectItem>
        <SelectItem value="registrar">Registrar</SelectItem>
      </SelectContent>
    </Select>
  );
}

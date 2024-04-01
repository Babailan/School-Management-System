import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectStrand = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Select>) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="abm">
            Accountancy and Business Management (ABM)
          </SelectItem>
          <SelectItem value="stem">
            Science, Technology, Engineering, and Mathematics (STEM)
          </SelectItem>
          <SelectItem value="humss">
            Humanities and Social Sciences (HUMSS)
          </SelectItem>
          <SelectItem value="gas">General Academic Strand (GAS)</SelectItem>
          <SelectItem value="he">Home Economics (HE)</SelectItem>
          <SelectItem value="ict">
            Information and Communication Technology (ICT)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStrand;

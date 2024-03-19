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
        <SelectValue placeholder="Select A Strand"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ABM">
            Accountancy and Business Management (ABM)
          </SelectItem>
          <SelectItem value="STEM">
            Science, Technology, Engineering, and Mathematics (STEM)
          </SelectItem>
          <SelectItem value="HUMSS">
            Humanities and Social Sciences (HUMSS)
          </SelectItem>
          <SelectItem value="GAS">General Academic Strand (GAS)</SelectItem>
          <SelectItem value="HE">Home Economics (HE)</SelectItem>
          <SelectItem value="ICT">
            Information and Communication Technology (ICT)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStrand;

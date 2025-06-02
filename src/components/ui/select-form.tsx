import { FC } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

interface FormSelectProps {
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
  control: any;
  data: DataOption[];
  className?: string;
  selectLabel?: string;
}
interface DataOption {
  field: string | number;
  value: string | number;
}
const SelectForm: FC<FormSelectProps> = ({
  name,
  label,
  control,
  description,
  placeholder,
  data,
  className,
  selectLabel,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className={className}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{selectLabel}</SelectLabel>
                {data &&
                  data.map((item) => (
                    <SelectItem key={item.field} value={item.field.toString()}>
                      {item.value}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SelectForm };

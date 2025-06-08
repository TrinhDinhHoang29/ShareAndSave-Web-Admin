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
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(val) => field.onChange(Number(val))} // string → number
            value={field.value !== undefined ? String(field.value) : undefined} // number → string
          >
            <FormControl className={className}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
                {data.map((item) => (
                  <SelectItem
                    key={item.field}
                    value={String(item.field)} // luôn dùng string
                  >
                    {item.value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SelectForm };

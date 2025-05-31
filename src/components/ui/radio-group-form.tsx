import { FC } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioGroupFormProps {
  control: any;
  label: string;
  name: string;
  data: {
    display: string;
    value: string | number;
  }[];
}

const RadioGroupForm: FC<RadioGroupFormProps> = ({
  control,
  name,
  label,
  data,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value.toString() ?? ""} // ✅ đảm bảo luôn có string
              className="flex items-center gap-16 space-y-1"
            >
              {data.map((item) => (
                <FormItem
                  key={item.value}
                  className="m-0 flex items-center space-y-0 space-x-3"
                >
                  <FormControl>
                    <RadioGroupItem
                      key={item.value}
                      value={item.value.toString()}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.display}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export { RadioGroupForm };

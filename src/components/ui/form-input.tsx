import { FC } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  description?: string;
  placeholder?: string;
  control: any;
  className?: string;
  disabled?: boolean;
}
const FormInput: FC<FormInputProps> = ({
  control,
  name,
  label,
  type = "text",
  description,
  disabled = false,
  ...props
}) => {
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={cn(props.className)}
              type={type}
              {...field}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;

import { FC } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // import Textarea component
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
  control: any;
  className?: string;
  rows?: number;
}

const FormTextarea: FC<FormTextareaProps> = ({
  control,
  name,
  label,
  description,
  rows = 4,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              className={cn(props.className)}
              placeholder={props.placeholder}
              rows={rows}
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

export default FormTextarea;

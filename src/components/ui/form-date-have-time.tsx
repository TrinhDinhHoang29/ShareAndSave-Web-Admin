import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  control: any;
  className?: string;
}

export const FormDateHaveTime: FC<FormInputProps> = ({
  control,
  name,
  label,
}) => {
  const [_, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const date = field.value ? new Date(field.value) : null;

        return (
          <FormItem className="flex flex-col gap-2">
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="pl-3 text-left font-normal"
                  >
                    {date ? (
                      format(date, "dd/MM/yyyy HH:mm")
                    ) : (
                      <span>Chọn ngày giờ</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <Calendar
                  mode="single"
                  selected={date ?? undefined}
                  onSelect={(d) => {
                    const newDate = d
                      ? new Date(
                          d.setHours(
                            date?.getHours() ?? 0,
                            date?.getMinutes() ?? 0
                          )
                        )
                      : null;
                    setSelectedDate(newDate);
                    field.onChange(newDate?.toISOString());
                  }}
                />
                <div className="mt-3 flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={
                      date
                        ? `${String(date.getHours()).padStart(2, "0")}:${String(
                            date.getMinutes()
                          ).padStart(2, "0")}`
                        : selectedTime
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value
                        .split(":")
                        .map(Number);
                      const newDate = date ?? new Date();
                      newDate.setHours(hours);
                      newDate.setMinutes(minutes);
                      setSelectedTime(e.target.value);
                      field.onChange(newDate.toISOString());
                    }}
                    className="border px-2 py-1 rounded text-sm"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

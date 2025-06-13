import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUsers } from "@/hooks/react-query-hooks/use-users";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { Label } from "@/components/ui/label"; // sửa lại import đúng
import { FormMessage } from "@/components/ui/form"; // nếu bạn muốn hiển thị lỗi

export const SenderSelect = ({
  control,
  name,
  label,
}: {
  control: any;
  name: string;
  label?: string;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { data: { clients = [] } = {} } = useUsers({
    searchBy: "fullName",
    searchValue,
    page: 1,
    limit: 20,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          {label && <Label htmlFor={name}>{label}</Label>}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {field.value
                  ? clients.find((u) => u.id === field.value)?.fullName ||
                    "Không rõ"
                  : "Chọn một người"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Tìm theo tên..."
                  onValueChange={setSearchValue}
                />
                <CommandList>
                  {clients.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.fullName}
                      onSelect={() => {
                        field.onChange(user.id);
                      }}
                    >
                      {user.fullName}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Hiển thị lỗi nếu có */}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </div>
      )}
    />
  );
};

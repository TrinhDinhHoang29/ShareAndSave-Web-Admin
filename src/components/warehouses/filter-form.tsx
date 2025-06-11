import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon, RefreshCcwIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
export interface FilterFormProps {
  onFilter: (props: { searchValue: string; searchBy: string }) => void;
}
export function FilterForm({ onFilter }: any) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("");
  const handleFilter = () => {
    onFilter({ searchValue, searchBy });

    setSearchValue("");
    setSearchBy("");
  };
  const handleRefetch = () => {
    setSearchValue("");
    setSearchBy("");
    onFilter({ searchValue, searchBy });
  };
  return (
    <div className="bg-white p-5 dark:bg-[var(--card)]   dark:border-[var(--border)] rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-auto">
          <Select
            onValueChange={(value) => setSearchBy(value)}
            value={searchBy}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn cột cần tìm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chọn trường</SelectLabel>
                <SelectItem value="sku">Mã lô hàng</SelectItem>
                <SelectItem value="senderName">Tên người gửi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full lg:w-auto flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              className="block w-full relative pl-10"
              placeholder="Nhập giá trị cần tìm..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
        </div>

        <div className="w-auto">
          <Button onClick={handleFilter}>
            <FilterIcon className="inline-block h-4 w-4 mr-1" />
            Lọc
          </Button>
        </div>
        <div className="w-auto">
          <Button onClick={handleRefetch}>
            <RefreshCcwIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

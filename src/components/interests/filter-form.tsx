import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/filter-api.type";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
export interface FilterFormProps {
  onFilter: (props: { searchValue: string; order: string }) => void;
}
export function FilterForm({ onFilter }: FilterFormProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [order, setOrder] = useState<string>(Order.DESC);
  const handleFilter = () => {
    setSearchValue("");
    onFilter({ searchValue, order });
  };

  return (
    <div className="bg-white p-5 dark:bg-[var(--card)]   dark:border-[var(--border)] rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="w-full lg:w-auto flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              className="block w-full relative pl-10"
              placeholder="Nhập từ khóa tìm kiếm"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Select onValueChange={(value) => setOrder(value)} value={order}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Loại bài đăng" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={Order.ASC.toString()}>Cũ nhất</SelectItem>
                <SelectItem value={Order.DESC.toString()}>Mới nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <Button onClick={handleFilter}>
            <FilterIcon className="inline-block h-4 w-4 mr-1" />
            Lọc
          </Button>
        </div>
      </div>
    </div>
  );
}

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
import { PostStatus, PostType } from "@/types/status.type";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
export interface FilterFormProps {
  onFilter: (props: {
    searchValue: string;
    searchBy: string;
    type: string;
    status: string;
  }) => void;
}
export function FilterForm({ onFilter }: any) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const handleFilter = () => {
    setSearchValue("");
    setSearchBy("");
    setType("");
    setStatus("");
    onFilter({ searchValue, searchBy, type, status });
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
                <SelectItem value="title">Tiêu đề</SelectItem>
                <SelectItem value="authorName">Họ và tên</SelectItem>
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
              placeholder="Tìm kiếm theo tên chiến dịch..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Select onValueChange={(value) => setType(value)} value={type}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Loại bài đăng" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={PostType.GIVE_AWAY_OLD_ITEM.toString()}>
                  Gửi lại đồ cũ
                </SelectItem>
                <SelectItem value={PostType.FOUND_ITEM.toString()}>
                  Nhặt được đồ
                </SelectItem>
                <SelectItem value={PostType.SEEK_LOST_ITEM.toString()}>
                  Tìm kiếm đồ
                </SelectItem>
                <SelectItem value={PostType.OTHER.toString()}>Khác</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <Select onValueChange={(value) => setStatus(value)} value={status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={PostStatus.PENDING.toString()}>
                  Chờ duyệt
                </SelectItem>
                <SelectItem value={PostStatus.APPROVED.toString()}>
                  Đã duyệt
                </SelectItem>
                <SelectItem value={PostStatus.REJECTED.toString()}>
                  Từ chối
                </SelectItem>
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

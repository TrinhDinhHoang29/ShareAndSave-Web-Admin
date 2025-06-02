import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Gift, Package, RotateCcw, Search } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  CreatePostTypeDto,
  CreatePostTypeSchema,
} from "@/schemas/posts/create-post.schema";

import { Button } from "@/components/ui/button";
import { PostType } from "@/types/status.type";

const categories = [
  {
    id: PostType.GIVE_AWAY_OLD_ITEM,
    title: "Gửi đồ cũ",
    description: "Đồ đã qua sử dụng nhưng vẫn còn giá trị",
    icon: Package,
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    selectedBg: "bg-blue-100",
    selectedBorder: "border-blue-500",
  },
  {
    id: PostType.FOUND_ITEM,
    title: "Nhặt đồ thất lạc",
    description: "Đồ bạn nhặt được và muốn trả lại",
    icon: RotateCcw,
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    selectedBg: "bg-green-100",
    selectedBorder: "border-green-500",
  },
  {
    id: PostType.SEEK_LOST_ITEM,
    title: "Tìm đồ thất lạc",
    description: "Tìm kiếm đồ bạn đã làm mất",
    icon: Search,
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    selectedBg: "bg-orange-100",
    selectedBorder: "border-orange-500",
  },
  {
    id: PostType.OTHER,
    title: "Khác",
    description: "Tự do đăng tải theo nội dung mong muốn",
    icon: Gift,
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "text-purple-600",
    selectedBg: "bg-purple-100",
    selectedBorder: "border-purple-500",
  },
];

type Props = {
  onNext: (data: CreatePostTypeDto) => void;
  onBack: () => void;
};

const CreatePostStep2 = ({ onBack, onNext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostTypeDto>({
    resolver: zodResolver(CreatePostTypeSchema),
  });

  const onSubmit: SubmitHandler<CreatePostTypeDto> = (data) => {
    onNext(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Chọn loại bài đăng
        </h2>
        <p className="text-gray-600">
          Vui lòng chọn loại bài đăng phù hợp với nội dung của bạn
        </p>
      </div>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => {
                const isSelected = field.value === category.id;
                const Icon = category.icon;

                return (
                  <div
                    key={category.id}
                    onClick={() => field.onChange(category.id)}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 
                      hover:shadow-lg hover:scale-[1.02] group
                      ${
                        isSelected
                          ? `${category.selectedBg} ${category.selectedBorder} shadow-lg scale-[1.02]`
                          : `${category.bgColor} ${category.borderColor} hover:${category.selectedBorder}`
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-6 h-6 rounded-full bg-${category.color}-800 flex items-center justify-center`}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                        ${isSelected ? `bg-${category.color}-600` : `bg-white`}
                        transition-colors duration-300`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-colors duration-300 ${
                            isSelected ? "text-white" : category.iconColor
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                            isSelected
                              ? `text-${category.color}-800`
                              : "text-gray-800"
                          }`}
                        >
                          {category.title}
                        </h3>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isSelected
                              ? `text-${category.color}-700`
                              : "text-gray-600"
                          }`}
                        >
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* 🧩 Hiển thị lỗi */}
            {errors.type && (
              <p className="text-sm text-red-600 mt-2">{errors.type.message}</p>
            )}
          </>
        )}
      />

      <div className="flex justify-between items-center mt-6">
        <Button type="button" onClick={onBack}>
          Quay lại
        </Button>
        <Button type="button" onClick={handleSubmit(onSubmit)}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default CreatePostStep2;

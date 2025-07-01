import { Button } from "@/components/ui/button";
import { useDeleteGoodDeed } from "@/hooks/react-query-hooks/use-good-deed";
import { IGoodDeed } from "@/types/models/good-deed.type";
import { GoodDeedType } from "@/types/status.type";
import { Clock, GiftIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";
const formatDate = (dateString: string) => {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Vừa xong";
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
  return date.toLocaleDateString("vi-VN");
};
const GoodDeedDropDown = ({
  createdAt,
  items,
  id,
  goodDeedType,
  goodPoint,
  userName,
}: IGoodDeed) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteGoodDeedMutation = useDeleteGoodDeed({
    onSuccess() {
      toast.success(`Xóa việc tốt của ${userName} thành công`);
      setIsOpen(false);
    },
    onError(error) {
      toast.error(error.message || "Lỗi hệ thống vui lòng thử lại sau");
    },
  });
  const { ask } = useConfirm();
  const handleDeleteGoodDeed = async (id: number) => {
    const res = await ask("Bạn có chắc chắn muốn cập nhật trạng thái này?");
    if (res) deleteGoodDeedMutation.mutate(id);
  };

  return (
    <div className="border rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Orange icon */}
            <div className="flex items-center space-x-1 bg-white px-3 py-2 border rounded-full shadow-sm">
              <GiftIcon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">{goodPoint}</span>
            </div>
            <div className="flex gap-x-4">
              <div className="flex items-center gap-1 flex-shrink-0">
                {goodDeedType === GoodDeedType.GIVE_LOSE_ITEM ? (
                  <>
                    <span className="text-xs flex gap-2 items-center text-red-500 font-semibold px-3 py-1 bg-gradient-to-r from-red-50 to-red-100 rounded-full border border-red-100">
                      Trả lại đồ thất lạc
                    </span>
                  </>
                ) : goodDeedType === GoodDeedType.GIVE_OLD_ITEM ? (
                  <>
                    <span className="flex gap-2 items-center text-xs text-yellow-500 font-semibold px-3 py-1 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-full border border-yellow-100">
                      Cho lại đồ cũ
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-green-500 flex gap-2 items-center font-semibold px-3 py-1 bg-gradient-to-r from-green-50 to-green-100 rounded-full border border-green-100">
                    Tham gia chuyến dịch
                  </span>
                )}
              </div>
              <div className="flex gap-x-2 items-center">
                <span>
                  <Clock className="w-4 h-4 text-gray-600" />
                </span>
                <span className="text-gray-600"> {formatDate(createdAt)}</span>
              </div>
            </div>
          </div>
          <Button variant={"outline"} onClick={() => handleDeleteGoodDeed(id)}>
            <Trash2 />
          </Button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen &&
        items.map((item) => (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-4 m-8">
            <div className="p-2">
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <img src={item.itemImage} alt="" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {item.itemName}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-x-2">
                    Số lượng: {item.quantity}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GoodDeedDropDown;

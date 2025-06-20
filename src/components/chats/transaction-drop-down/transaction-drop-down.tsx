import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useUpdateTransaction } from "@/hooks/react-query-hooks/use-transaction";
import { ITransaction } from "@/types/models/transaction.type";
import { DeliveryMethod, TransactionStatus } from "@/types/status.type";
import { IconReload } from "@tabler/icons-react";
import {
  Ban,
  CheckCircle2,
  ChevronDown,
  CircleCheck,
  Clock,
  Package,
  Truck,
  Users,
  X,
} from "lucide-react";
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
const TransactionDropDown = ({
  createdAt,
  items,
  status,
  method,
  receiverID,
  id,
}: ITransaction) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  const updateTransactionMutation = useUpdateTransaction({
    onSuccess() {
      toast.success("Cập nhật thành công");
      setIsOpen(false);
    },
    onError(error) {
      toast.error(error.message || "Lỗi hệ thống vui lòng thử lại sau");
    },
  });
  const { ask } = useConfirm();
  const handleUpdateTransaction = async (status: number) => {
    const res = await ask("Bạn có chắc chắn muốn cập nhật trạng thái này?");
    if (res)
      updateTransactionMutation.mutate({
        id: id,
        status,
      });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="border rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Orange icon */}
            <div className="flex items-center space-x-1 bg-white px-3 py-2 border rounded-full shadow-sm">
              <Package className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">{items.length}</span>
            </div>
            <div className="flex gap-x-4">
              <div className="flex gap-x-2 items-center">
                <span>
                  {method == DeliveryMethod.DELIVERY ? (
                    <Truck className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Users className="w-4 h-4 text-gray-600" />
                  )}
                </span>
                <span className="text-gray-600"> {method}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {status === TransactionStatus.CANCELLED ? (
                  <>
                    <span className="text-xs flex gap-2 items-center text-red-500 font-semibold px-3 py-1 bg-gradient-to-r from-red-50 to-red-100 rounded-full border border-red-100">
                      <Ban className="w-4 h-4  text-red-500 " />
                      Đã hủy
                    </span>
                  </>
                ) : status === TransactionStatus.PENDING ? (
                  <>
                    <span className="flex gap-2 items-center text-xs text-yellow-500 font-semibold px-3 py-1 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-full border border-yellow-100">
                      <IconReload className="w-4 h-4 text-yellow-500 " />
                      Đang chờ
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-green-500 flex gap-2 items-center font-semibold px-3 py-1 bg-gradient-to-r from-green-50 to-green-100 rounded-full border border-green-100">
                    <CheckCircle2 className="w-4 h-4  text-green-500 " />
                    Đã hoàn thành
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
          <div className="flex items-center space-x-2">
            {user.user?.id === receiverID ||
              (status === TransactionStatus.PENDING && (
                <div className="flex gap-x-4">
                  <Button
                    onClick={() =>
                      handleUpdateTransaction(TransactionStatus.CANCELLED)
                    }
                    className="bg-red-600 text-white "
                  >
                    <X /> Từ chối
                  </Button>
                  <Button
                    className="bg-green-600 text-white "
                    onClick={() =>
                      handleUpdateTransaction(TransactionStatus.SUCCESS)
                    }
                  >
                    <CircleCheck /> Đồng ý
                  </Button>
                </div>
              ))}
            <button
              onClick={toggleDropdown}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
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

export default TransactionDropDown;

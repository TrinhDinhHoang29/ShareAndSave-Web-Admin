import TransactionDropDown from "@/components/chats/transaction-drop-down/transaction-drop-down";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ITransaction } from "@/types/models/transaction.type";
import { Eye, Package2 } from "lucide-react";

const PopupShowItemTransaction = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <div className="flex gap-x-2 items-center">
            <Eye className="w-4 h-4" />
            <span>{transaction.items.length} món</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-x-2 items-center">
              <Package2 className="w-4 h-4" />
              <span>Danh sách món đồ </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Đây là toàn bộ món đồ của giao dịch
          </DialogDescription>
        </DialogHeader>
        {transaction.items.map((item) => (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 m-8 mb-1">
            <div className="p-2 pb-0">
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
      </DialogContent>
    </Dialog>
  );
};

export default PopupShowItemTransaction;

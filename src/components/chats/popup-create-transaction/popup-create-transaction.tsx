import ItemPill from "@/components/chats/item-pill/item-pill";
import TabTransaction from "@/components/transactions/tab";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectForm } from "@/components/ui/select-form";
import { SelectedItem } from "@/pages/_authenticated/chats";
import { useState } from "react";

const PopupCreateTransaction = ({
  isOpen,
  setIsOpen,
  items,
  handleClose,
  handleChangeQuantity,
  handleCreateTransaction,
  activeTab,
  setActiveTab,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: SelectedItem[];
  handleChangeQuantity: (item: SelectedItem) => void;
  handleClose: (item: SelectedItem) => void;
  handleCreateTransaction: () => void;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          <span className="absolute inset-0 rounded-lg animate-ping bg-gray-600 opacity-75 scale-60 "></span>
          <span className="absolute inset-0 rounded-lg animate-ping bg-gray-700 opacity-75 scale-60 "></span>

          <Button variant="outline" className="relative z-10">
            Tạo giao dịch
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo giao dịch</DialogTitle>
          <DialogDescription>
            Đây là nơi bạn có thể tạo giao dịch mới. Vui lòng điền đầy đủ thông
            tin cần thiết để hoàn tất giao dịch.
          </DialogDescription>
        </DialogHeader>
        <div>
          <TabTransaction
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            key={1}
          />
        </div>
        {items.map((item) => (
          <ItemPill
            key={item.postItemID}
            handleSelectedItem={handleChangeQuantity}
            name={item.name}
            postItemID={item.postItemID}
            quantity={item.quantity}
            image={item.image}
            currentQuantity={item.currentQuantity}
            handleClose={handleClose}
          />
        ))}
        <div className="text-right">
          <Button onClick={handleCreateTransaction}>Xác nhận</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupCreateTransaction;

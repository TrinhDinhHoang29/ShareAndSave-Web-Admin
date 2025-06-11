import ItemInfoSheet from "@/components/items/item-info-sheet/item-info-sheet";
import LoadingSpinner from "@/components/loading-spinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IItem } from "@/types/models/item.type";
import React from "react";

export interface SheetDetailPostProps {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  data: IItem | null;
}

const SheetDetailItem = ({
  openSheet,
  setOpenSheet,
  data,
}: SheetDetailPostProps) => {
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent
        side="right"
        className="w-full max-w-[90vw] sm:max-w-[850px] flex flex-col"
      >
        <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600 flex-shrink-0">
          <SheetTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Thông tin chi tiết món đồ
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-300">
            Xem chi tiết thông tin món đồ
          </SheetDescription>
        </SheetHeader>
        {data ? <ItemInfoSheet item={data} /> : <LoadingSpinner />}
      </SheetContent>
    </Sheet>
  );
};

export default SheetDetailItem;

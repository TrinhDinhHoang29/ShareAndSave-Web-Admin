import LoadingSpinner from "@/components/loading-spinner";
import PostInfoSheet from "@/components/posts/post-info-sheet/post-info-sheet";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IPost } from "@/types/models/post.type";
import React from "react";

export interface SheetDetailPostProps {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  data: IPost | null;
}

const SheetDetailPost = ({
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
            Thông tin chi tiết bài đăng
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-300">
            Xem chi tiết thông tin bài đăng
          </SheetDescription>
        </SheetHeader>
        {data ? <PostInfoSheet post={data} /> : <LoadingSpinner />}
      </SheetContent>
    </Sheet>
  );
};

export default SheetDetailPost;

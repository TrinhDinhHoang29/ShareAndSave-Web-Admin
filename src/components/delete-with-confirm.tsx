import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const DeleteWithConfirm = ({ onDelete }: { onDelete: () => void }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleDelete = () => {
    if (input === "DELETE") {
      onDelete();
      setOpen(false);
      setInput("");
    } else {
      toast.error('Bạn cần nhập đúng chữ "DELETE" để xác nhận.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xoá</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-2 py-2">
          <div>
            Bạn phải nhập <span className="font-bold text-red-500">DELETE</span>{" "}
            để xác nhận xoá. Thao tác này không thể hoàn tác!
          </div>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            placeholder='Nhập "DELETE"'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={input !== "DELETE"}
            >
              Xoá vĩnh viễn
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWithConfirm;

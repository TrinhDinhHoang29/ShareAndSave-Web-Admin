import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { SelectForm } from "@/components/ui/select-form";
import { useCreateGoodDeed } from "@/hooks/react-query-hooks/use-good-deed";
import {
  CreateGoodDeedDto,
  CreateGoodDeedSchema,
} from "@/schemas/good-deeds/create-good-deed.schema";
import { IUser } from "@/types/models/user.type";
import { GoodDeedType } from "@/types/status.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Import AlertDialog của shadcn/ui
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PopupShowGoodDeed = ({ user }: { user: IUser }) => {
  const [tab, setTab] = useState<"CREATE" | "GET">("GET");
  const [open, setOpen] = useState<boolean>(false);

  // State cho AlertDialog xác nhận
  const [alertOpen, setAlertOpen] = useState(false);
  const [pendingData, setPendingData] = useState<CreateGoodDeedDto | null>(
    null
  );

  const form = useForm<CreateGoodDeedDto>({
    resolver: zodResolver(CreateGoodDeedSchema),
    defaultValues: {
      userID: user.id,
    },
  });

  const createGoodDeedMutation = useCreateGoodDeed({
    onSuccess: () => {
      toast.success("Tạo việc tốt thành công");
      form.reset();
      setTab("GET");
      setAlertOpen(false);
      setPendingData(null);
      // Nếu muốn đóng dialog khi thành công, gọi setOpen(false) tại đây
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi hệ thống vui lòng thử lại sau");
      setAlertOpen(false);
      setPendingData(null);
    },
  });

  // Khi submit, chỉ mở alert xác nhận, không gửi luôn!
  const onSubmit = (data: CreateGoodDeedDto) => {
    setPendingData(data);
    setAlertOpen(true);
  };

  // Khi xác nhận trong AlertDialog:
  const handleConfirm = () => {
    if (pendingData) {
      createGoodDeedMutation.mutate(pendingData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <div className="flex gap-x-2 items-center">
            <span>{user.goodPoint} Điểm</span>
            <Eye className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tab === "GET" ? (
              <div className="flex items-center justify-between my-3 mt-5">
                <div className="flex gap-x-2 items-center">
                  <span>Danh sách việc tốt</span>
                </div>
                <Button variant={"outline"} onClick={() => setTab("CREATE")}>
                  Thêm việc tốt
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between my-3 mt-5">
                <div className="flex gap-x-2 items-center">
                  <Button variant={"ghost"} onClick={() => setTab("GET")}>
                    <ArrowLeft />
                  </Button>
                  <span>Danh sách việc tốt</span>
                </div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>
        {tab === "GET" ? (
          <></>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <SelectForm
                control={form.control}
                placeholder="Chọn loại việc tốt"
                data={[
                  {
                    field: GoodDeedType.GIVE_OLD_ITEM,
                    value: "Tặng đồ cũ",
                  },
                  {
                    field: GoodDeedType.GIVE_LOSE_ITEM,
                    value: "Trả đồ thất lạc",
                  },
                  {
                    field: GoodDeedType.CAMPAIGN,
                    value: "Tham gia chuyến dịch",
                  },
                ]}
                name="goodDeedType"
                label="Loại việc tốt *"
              />
              <FormInput
                control={form.control}
                name="transactionID"
                label="Mã giao dịch"
                description="Mã giao dịch chỉ điền khi giao dịch của người dùng bị gián đoạn và không được tính điểm đây là biện pháp để bổ sung, Không được lạm dụng."
              />
              <Button type="submit">Xác nhận</Button>
            </form>
          </Form>
        )}
        {/* AlertDialog confirm ngay trong DialogContent */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bạn có chắc chắn muốn tạo việc tốt?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlertOpen(false)}>
                Huỷ
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Xác nhận
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};

export default PopupShowGoodDeed;

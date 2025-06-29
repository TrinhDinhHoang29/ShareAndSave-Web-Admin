import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { SelectForm } from "@/components/ui/select-form";
import { SingleImageUpload } from "@/components/ui/single-image-upload";
import FormTextarea from "@/components/ui/textarea-form";
import { useCategories } from "@/hooks/react-query-hooks/use-category";
import { useCreateNewItem } from "@/hooks/react-query-hooks/use-item";
import {
  CreateNewItemDto,
  CreateNewItemSchema,
} from "@/schemas/items/create-new-item.schema";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";
import { useState } from "react";

export function PopupCreateNewItem() {
  const form = useForm<CreateNewItemDto>({
    resolver: zodResolver(CreateNewItemSchema),
  });
  const [open, setOpen] = useState(false);
  const { ask } = useConfirm();
  const { data, isPending } = useCategories();

  const itemCreateMutation = useCreateNewItem({
    onSuccess: () => {
      toast.success("Thêm mới món đồ thành công");
      form.reset();

      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi hệ thống vui lòng thử lại sau");
    },
  });
  const onSubmit = async (data: CreateNewItemDto) => {
    const res = await ask("Bạn có chắc chắn muốn thêm thông tin này?");
    if (res) {
      itemCreateMutation.mutate(data);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          Thêm món đồ <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo mới thông tin món đồ</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {isPending || !data ? (
          <LoadingSpinner />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormInput
                control={form.control}
                name="name"
                label="Tên món đồ"
              />
              <FormInput
                type="number"
                control={form.control}
                name="maxClaim"
                label="Số lượng tối đa"
              />
              <SelectForm
                label="Danh mục"
                placeholder="Chọn danh mục"
                control={form.control}
                data={data.categories.map((item) => {
                  return {
                    field: item.id,
                    value: item.name,
                  };
                })}
                name="categoryID"
              />
              <FormTextarea
                control={form.control}
                name="description"
                label="Mô tả"
              />

              <SingleImageUpload
                control={form.control}
                name="image"
                label="Hình ảnh"
              />
              <div className="text-center">
                <Button type="submit">Xác nhận</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

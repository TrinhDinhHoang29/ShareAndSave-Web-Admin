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
import { useUpdateItem } from "@/hooks/react-query-hooks/use-item";
import {
  UpdateItemDto,
  UpdateItemSchema,
} from "@/schemas/items/update-item.schema";
import { IItem } from "@/types/item.type";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

export function PopupUpdateItem({ item }: { item: IItem }) {
  const form = useForm<UpdateItemDto>({
    resolver: zodResolver(UpdateItemSchema),
    defaultValues: {
      name: item.name,
      description: item.description,
      categoryID: item.categoryID,
      image: item.image,
    },
  });
  const { ask } = useConfirm();
  const { data, isPending } = useCategories();

  const itemUpdateMutation = useUpdateItem({
    onSuccess: () => {
      toast.success("Cập nhật thành công");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi hệ thống");
    },
  });
  const onSubmit = async (data: UpdateItemDto) => {
    const res = await ask("Bạn có chắc chắn muốn cập nhật thông tin này?");
    if (res) {
      itemUpdateMutation.mutate({ id: item.id, data });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
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
              <SelectForm
                label="Danh mục"
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

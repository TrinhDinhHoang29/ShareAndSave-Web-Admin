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
import { useCategories } from "@/hooks/use-category";
import {
  CreateItemDto,
  CreateItemSchema,
} from "@/schemas/items/create-item.schema";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export function PopupCreateItem({ listNewItem, setListNewItem }: any) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateItemDto>({
    resolver: zodResolver(CreateItemSchema),
  });
  const getCategoryQuery = useCategories();

  const onSubmit = (data: CreateItemDto) => {
    setListNewItem(() => [...listNewItem, data]);
    console.log("listNewItem");
    setOpen(false); // ✅ đóng dialog
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="ml-auto">
          <PlusCircle /> Thêm sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm mới</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* userQuery.isPending || !userQuery.data */}
        {!getCategoryQuery.data || getCategoryQuery.isPending ? (
          <LoadingSpinner />
        ) : (
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
              className="w-full space-y-8"
            >
              <FormInput
                control={form.control}
                name="name"
                label="Tên sản phẩm"
              />
              <FormInput
                control={form.control}
                name="quantity"
                type="number"
                label="Số lượng sản phẩm"
              />
              <SelectForm
                control={form.control}
                name="categoryID"
                label="Danh mục"
                placeholder="Chọn danh mục"
                selectLabel="Chọn danh mục"
                data={getCategoryQuery.data.categories.map((item) => ({
                  field: item.id,
                  value: item.name,
                }))}
              />
              <SingleImageUpload
                control={form.control}
                name="image"
                label="Ảnh sản phẩm"
              />
              <div className="text-center">
                <Button type="submit">Tạo sản phẩm</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

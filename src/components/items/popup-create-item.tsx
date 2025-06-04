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
import { useCategories } from "@/hooks/react-query-hooks/use-category";
import {
  CreateItemDto,
  CreateItemSchema,
} from "@/schemas/items/create-item.schema";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IOldItem } from "@/components/posts/multi-form/step-3";
import { PopupDisplayItem } from "@/components/items/popup-list-item";
import {
  CreateOldItemDto,
  CreateOldItemSchema,
} from "@/schemas/items/create-old-item.schema";

export function PopupCreateItem({
  listNewItem,
  setListNewItem,
  listOldItems,
  setListOldItems,
}: {
  listNewItem: CreateItemDto[];
  setListNewItem: React.Dispatch<React.SetStateAction<CreateItemDto[]>>;
  listOldItems: IOldItem[];
  setListOldItems: React.Dispatch<React.SetStateAction<IOldItem[]>>;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateItemDto>({
    resolver: zodResolver(CreateItemSchema),
  });
  const formOld = useForm<CreateOldItemDto>({
    resolver: zodResolver(CreateOldItemSchema),
  });

  const [selectedItem, setSelectedItem] = useState<IOldItem | null>(null);
  useEffect(() => {
    if (selectedItem) {
      // Khi chọn item cũ → reset form cũ
      formOld.reset({
        id: selectedItem.id,
        name: selectedItem.name,
        quantity: 1,
        image: undefined,
      });
      // Đồng thời clear form tạo mới
    }
  }, [selectedItem]);
  const getCategoryQuery = useCategories();
  const onSubmitOld = (data: CreateOldItemDto) => {
    setListOldItems([
      ...listOldItems,
      {
        id: data.id,
        name: data.name!,
        image: data.image,
        quantity: data.quantity,
      },
    ]);
    setOpen(false); // ✅ đóng dialog
    formOld.reset();
    setSelectedItem(null);
  };
  const onSubmit = (data: CreateItemDto) => {
    setListNewItem(() => [...listNewItem, data]);
    setOpen(false);
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusCircle /> Thêm sản phẩm mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm mới</DialogTitle>
          <DialogDescription>
            Chọn sản phẩm từ kho hoặc tạo sản phẩm mới.
          </DialogDescription>
        </DialogHeader>
        {/* userQuery.isPending || !userQuery.data */}
        {!getCategoryQuery.data || getCategoryQuery.isPending ? (
          <LoadingSpinner />
        ) : selectedItem ? (
          <Form {...formOld} key="old">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formOld.handleSubmit(onSubmitOld)();
              }}
              className="w-full space-y-8"
            >
              <FormInput
                control={formOld.control}
                name="name"
                label="Tên sản phẩm"
                disabled={true}
              />
              <FormInput
                control={formOld.control}
                name="quantity"
                type="number"
                label="Số lượng sản phẩm"
              />
              <div className="flex items-center gap-2">
                <PopupDisplayItem
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
                <Button
                  variant={"outline"}
                  onClick={() => setSelectedItem(null)}
                >
                  <X />
                </Button>
              </div>

              <SingleImageUpload
                control={formOld.control}
                name="image"
                label="Ảnh sản phẩm"
              />
              <div className="text-center">
                <Button type="submit">Tạo sản phẩm</Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...form} key="new">
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
              <PopupDisplayItem
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
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

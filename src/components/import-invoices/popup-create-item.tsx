import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PopupDisplayItem } from "@/components/items/popup-list-item";
import LoadingSpinner from "@/components/loading-spinner";
import { IOldItem } from "@/components/posts/multi-form/step-3";
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
import { useCategories } from "@/hooks/react-query-hooks/use-category";
import {
  CreateItemImportInvoiceDto,
  CreateItemImportInvoiceSchema,
} from "@/schemas/import-invoices/create-item-import-invoice";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import FormTextarea from "@/components/ui/textarea-form";

export function PopupCreateItem({
  listItems,
  setListsNewItem,
}: {
  listItems: CreateItemImportInvoiceDto[];
  setListsNewItem: React.Dispatch<
    React.SetStateAction<CreateItemImportInvoiceDto[]>
  >;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateItemImportInvoiceDto>({
    resolver: zodResolver(CreateItemImportInvoiceSchema),
  });

  const [selectedItem, setSelectedItem] = useState<IOldItem | null>(null);
  useEffect(() => {
    if (selectedItem) {
      // Khi chọn item cũ → reset form cũ
      form.reset({
        name: selectedItem.name,
        itemID: selectedItem.id,
      });
      // Đồng thời clear form tạo mới
    }
  }, [selectedItem]);
  const getCategoryQuery = useCategories();
  const onSubmit = (data: CreateItemImportInvoiceDto) => {
    const existingIndex = listItems.findIndex(
      (item) => item.itemID === data.itemID
    );

    if (existingIndex !== -1) {
      // 🔁 Cập nhật quantity
      const updatedItems = [...listItems];
      updatedItems[existingIndex].quantity += data.quantity;

      setListsNewItem(updatedItems);
    } else {
      // ➕ Thêm mới
      setListsNewItem([...listItems, data]);
    }

    setOpen(false); // đóng dialog
    form.reset(); // reset form
    setSelectedItem(null); // clear selected
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusCircle /> Thêm sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogDescription>Chọn các sản phẩm từ kho</DialogDescription>
        </DialogHeader>
        {!getCategoryQuery.data || getCategoryQuery.isPending ? (
          <LoadingSpinner />
        ) : (
          <>
            <Form {...form} key="old">
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
                  disabled={true}
                />
                <FormInput
                  control={form.control}
                  name="quantity"
                  type="number"
                  label="Số lượng sản phẩm"
                />
                <FormTextarea
                  name="description"
                  label="Mô tả"
                  control={form.control}
                />
                <div className="flex items-center gap-2">
                  <PopupDisplayItem
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X />
                  </Button>
                </div>
                <div className="text-center">
                  <Button type="submit">Tạo sản phẩm</Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

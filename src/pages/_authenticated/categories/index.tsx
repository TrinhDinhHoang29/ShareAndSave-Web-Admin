import { Package2, Plus, Save, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";

import ViewCategory from "@/components/categories/view-category";
import { Main } from "@/components/layout/main";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/react-query-hooks/use-category";
import { ICategory } from "@/types/models/category.type";

const ListCategoriesPage = () => {
  const categoriesQuery = useCategories();
  const categoryMutation = useCreateCategory({
    onSuccess: () => {
      toast.success("Thêm loại món đồ thành công");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Thêm loại món đồ thất bại");
    },
  });
  const updateCategoryMutation = useUpdateCategory({
    onSuccess: () => {
      toast.success("Cập nhật loại món đồ thành công");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Cập nhật loại món đồ thất bại");
    },
  });
  const deleteCategoryMutation = useDeleteCategory({
    onSuccess: () => {
      toast.success("Xóa loại món đồ thành công");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Xóa loại món đồ thất bại");
    },
  });
  const { ask } = useConfirm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const handleEdit = (category: ICategory) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
    });
  };

  const handleSave = async (id: number) => {
    const res = await ask("Bạn có chắc chắn muốn sửa không?");
    if (res) {
      updateCategoryMutation.mutate({
        id,
        data: {
          name: editForm.name,
        },
      });
    }
    setEditingId(null);
    setEditForm({ name: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "" });
  };

  const handleDelete = async (id: number) => {
    const res = await ask("Bạn có chắc chắn muốn sửa không?");
    if (res) {
      deleteCategoryMutation.mutate(id);
    }
  };

  const handleAddNew = async () => {
    const res = await ask("Bạn có chắc chắn muốn thêm mới không?");
    if (res) {
      if (newCategory.name.trim()) {
        categoryMutation.mutate({
          name: newCategory.name,
        });
        setNewCategory({ name: "" });
        setIsAddingNew(false);
      }
    }
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewCategory({ name: "" });
  };

  return (
    <Main>
      <div className="bg-background min-h-screen">
        <div className="">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-foreground mb-2 text-3xl font-bold">
                Quản lý Category
              </h1>
              <p className="text-muted-foreground">
                Danh sách các danh mục sản phẩm
              </p>
            </div>
            <button
              onClick={() => setIsAddingNew(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex transform items-center gap-2 rounded-full px-6 py-3 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Plus size={20} />
              Thêm loại món đồ
            </button>
          </div>

          <div className="space-y-4">
            {/* Add new category pill */}
            {isAddingNew && (
              <div className="border-primary/30 bg-card rounded-full border-2 border-dashed p-4 shadow-lg transition-all duration-200 hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-purple-200 bg-purple-50 shadow-inner dark:border-purple-800 dark:bg-purple-950">
                    <Package2 />
                  </div>
                  <div className="flex flex-1 gap-4">
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring flex-1 rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-offset-2"
                      placeholder="Nhập tên category"
                    />
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      onClick={handleAddNew}
                      disabled={!newCategory.name.trim()}
                      className="rounded-full bg-green-600 p-2 text-white shadow-md transition-colors hover:bg-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={handleCancelAdd}
                      className="bg-muted text-muted-foreground hover:bg-muted/80 rounded-full p-2 shadow-md transition-colors hover:shadow-lg"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <p className="text-muted-foreground text-sm"></p>
                </div>
              </div>
            )}

            {/* Category pills */}
            {categoriesQuery.isPending ||
            !categoriesQuery.data ||
            categoryMutation.isPending ||
            updateCategoryMutation.isPending ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              categoriesQuery.data.categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-card border-border transform rounded-full border shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  {editingId === category.id ? (
                    // Edit mode
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-purple-200 bg-purple-50 shadow-inner dark:border-purple-800 dark:bg-purple-950">
                          <Package2 />
                        </div>
                        <div className="flex flex-1 gap-4">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring flex-1 rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-offset-2"
                          />
                        </div>
                        <div className="flex flex-shrink-0 gap-2">
                          <Button
                            onClick={() => handleSave(category.id)}
                            disabled={!editForm.name.trim()}
                            className="rounded-full"
                          >
                            <Save size={18} />
                          </Button>
                          <Button
                            onClick={handleCancel}
                            className="bg-muted text-muted-foreground hover:bg-muted/80 rounded-full p-2 shadow-md transition-colors hover:shadow-lg"
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ViewCategory
                      category={category}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  )}
                </div>
              ))
            )}
          </div>

          {categoriesQuery.data?.categories!.length === 0 && !isAddingNew && (
            <div className="py-16 text-center">
              <div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                <Upload size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-foreground mb-2 text-xl font-medium">
                Chưa có category nào
              </h3>
              <p className="text-muted-foreground mb-6">
                Nhấn "Thêm Category" để tạo category đầu tiên
              </p>
              <button
                onClick={() => setIsAddingNew(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 shadow-lg transition-colors"
              >
                Bắt đầu tạo
              </button>
            </div>
          )}
        </div>
      </div>
    </Main>
  );
};

export default ListCategoriesPage;

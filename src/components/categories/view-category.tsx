import { Edit, Package2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ICategory } from "@/types/models/category.type";

const ViewCategory = ({
  category,
  handleEdit,
  handleDelete,
}: {
  category: ICategory;
  handleEdit: any;
  handleDelete: any;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-purple-200 bg-purple-50 shadow-inner dark:border-purple-800 dark:bg-purple-950">
            <Package2 size={40} />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-1 text-lg font-semibold">
              {category.name}
            </h3>
            <div className="text-muted-foreground flex gap-4 text-sm">
              <span>Ngày tạo: {formatDate(category.createdAt)}</span>
            </div>
          </div>
          <div className="flex flex-shrink-0 gap-2">
            <Button
              type="button"
              onClick={() => handleEdit(category)}
              className="rounded-full"
            >
              <Edit size={18} />
            </Button>
            <Button
              type="button"
              onClick={() => handleDelete(category.id)}
              className="rounded-full"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCategory;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateItemImportInvoiceDto } from "@/schemas/import-invoices/create-item-import-invoice";
import { PopupCreateItem } from "@/components/import-invoices/popup-create-item";

interface ProductItemsCardProps {
  listItems: CreateItemImportInvoiceDto[];
  setListsNewItem: React.Dispatch<
    React.SetStateAction<CreateItemImportInvoiceDto[]>
  >;
  onRemoveItem?: (index: number) => void;
}

const ProductItemsCard = ({
  setListsNewItem,
  listItems,
  onRemoveItem,
}: ProductItemsCardProps) => {
  const totalQuantity = listItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const totalItems = listItems.length;

  if (listItems.length === 0) {
    return (
      <Card className="h-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg justify-between">
            <div className="flex items-center gap-2">
              <PopupCreateItem
                listItems={listItems}
                setListsNewItem={setListsNewItem}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Chưa có sản phẩm nào được thêm</p>
            <p className="text-sm">Nhấn "Thêm sản phẩm" để bắt đầu</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PopupCreateItem
              listItems={listItems}
              setListsNewItem={setListsNewItem}
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{totalItems} sản phẩm</Badge>
            <Badge variant="outline">Tổng: {totalQuantity}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden p-x-8">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {listItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {item.name || "Tên sản phẩm"}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      ID: {item.itemID}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>
                      <span className="font-medium">Số lượng:</span>{" "}
                      {item.quantity || 0}
                    </div>
                  </div>

                  {item.description && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Mô tả:</span>
                      <p className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {onRemoveItem && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalItems > 5 && (
          <div className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {Math.min(5, totalItems)} / {totalItems} sản phẩm
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductItemsCard;

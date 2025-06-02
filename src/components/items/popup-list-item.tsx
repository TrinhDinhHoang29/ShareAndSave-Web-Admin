import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ItemCardList from "@/components/items/item-list";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategories } from "@/hooks/use-category";
import { useItems } from "@/hooks/use-item";
import {
  CreateItemDto,
  CreateItemSchema,
} from "@/schemas/items/create-item.schema";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { IOldItem } from "@/components/posts/multi-form/step-3";

export function PopupDisplayItem({
  selectedItems,
  setSelectedItems,
}: {
  selectedItems: Set<IOldItem>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<IOldItem>>>;
}) {
  const form = useForm<CreateItemDto>({
    resolver: zodResolver(CreateItemSchema),
  });
  const getCategoryQuery = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | null | any
  >(null);
  const [page, setPage] = useState(1);
  const limit = 6;

  const getItemsQuery = useItems({
    searchBy: "categoryID",
    searchValue: selectedCategoryId,
    page,
    limit,
  });

  useEffect(() => {
    if (
      getCategoryQuery.isSuccess &&
      getCategoryQuery.data.categories.length > 0
    ) {
      setSelectedCategoryId(getCategoryQuery.data.categories[0].id.toString());
    }
  }, [getCategoryQuery.isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant={"outline"} className="w-full">
          <PlusCircle /> Danh sách sản phẩm
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[90vw] !max-w-[90vw] max-h-[90vh] overflow-y-auto rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Danh sách sản phẩm</DialogTitle>
          <DialogDescription>
            Đây là các sản phẩm có sẵn trong kho. Nếu sản phẩm bạn tìm không có
            thì vui lòng thêm mới.
          </DialogDescription>
        </DialogHeader>

        {getCategoryQuery.isPending || !getCategoryQuery.data ? (
          <LoadingSpinner />
        ) : (
          <Tabs
            orientation="vertical"
            className="space-y-4"
            onValueChange={(value) => {
              setSelectedCategoryId(value);
              setPage(1);
            }}
          >
            <div className="w-full overflow-x-auto pb-2">
              <TabsList>
                {getCategoryQuery.data.categories.map((item) => (
                  <TabsTrigger key={item.id} value={item.id.toString()}>
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {getCategoryQuery.data.categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id.toString()}
                className="space-y-4"
              >
                {getItemsQuery.isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <ItemCardList
                      mockItems={getItemsQuery.data?.items ?? []}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                    <div className="flex justify-center gap-4 pt-4">
                      <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                      >
                        Trang trước
                      </Button>
                      <span className="self-center">Trang {page}</span>
                      <Button
                        variant="outline"
                        disabled={!getItemsQuery.data?.totalPage}
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Trang sau
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

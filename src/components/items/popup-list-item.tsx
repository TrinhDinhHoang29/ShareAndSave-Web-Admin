import ItemCardList from "@/components/items/item-list";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategories } from "@/hooks/react-query-hooks/use-category";
import { useItems } from "@/hooks/react-query-hooks/use-item";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function PopupDisplayItem({
  setSelectedItem,
}: {
  selectedItem: IOldItem | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<IOldItem | null>>;
}) {
  const [open, setOpen] = useState(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusCircle /> Chọn sản phẩm
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
                      setSelectedItem={setSelectedItem}
                      setOpen={setOpen}
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
                        disabled={
                          getItemsQuery.data?.totalPage
                            ? getItemsQuery.data?.totalPage === page
                            : true
                        }
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

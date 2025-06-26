import { PopupCreateItem } from "@/components/items/popup-create-item";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormDate } from "@/components/ui/form-date";
import FormInput from "@/components/ui/form-input";
import { MultiImageUpload } from "@/components/ui/multi-Image-upload";
import FormTextarea from "@/components/ui/textarea-form";
import { FormData } from "@/pages/_authenticated/posts/create";
import { CreateItemDto } from "@/schemas/items/create-item.schema";
import {
  CreatePostInfoDto,
  CreatePostInfoSchema,
} from "@/schemas/posts/create-post.schema";
import { PostType } from "@/types/status.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Props = {
  onNext: (data: CreatePostInfoDto) => void;
  onBack: () => void;
  formData: FormData | undefined;
};
export interface IOldItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
}
const CreatePostStep3 = ({ onNext, onBack, formData }: Props) => {
  const form = useForm<CreatePostInfoDto>({
    resolver: zodResolver(CreatePostInfoSchema),
  });
  const [listOldItems, setListOldItems] = useState<IOldItem[]>([]);
  const [listNewItem, setListNewItem] = useState<CreateItemDto[]>([]);
  const onSubmit = (data: CreatePostInfoDto) => {
    data.newItems = listNewItem;
    data.oldItems = listOldItems.map((item) => ({
      quantity: item.quantity,
      itemID: item.id,
      image: item.image,
    }));
    onNext(data);
  };
  return (
    <div className="sm:mx-12 mx-2">
      <div className="my-4 flex gap-2 justify-end">
        {formData!.type !== PostType.OTHER && (
          <>
            <PopupCreateItem
              listOldItems={listOldItems}
              setListOldItems={setListOldItems}
              listNewItem={listNewItem}
              setListNewItem={setListNewItem}
            />
          </>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormInput
            control={form.control}
            name="title"
            label="Tiêu đề bài viết"
          />
          {formData!.type === PostType.SEEK_LOST_ITEM ? (
            <>
              <FormDate
                control={form.control}
                name="lostDate"
                label="Ngày mất"
              />
              <FormInput
                control={form.control}
                name="lostLocation"
                label="Nơi mất"
              />
              <FormInput
                control={form.control}
                name="reward"
                label="Phần thưởng"
              />
              <FormInput
                control={form.control}
                name="category"
                label="Thể loại"
              />
            </>
          ) : formData!.type === PostType.FOUND_ITEM ? (
            <>
              <FormDate
                control={form.control}
                name="foundDate"
                label="Nhặt vào ngày"
              />
              <FormInput
                control={form.control}
                name="foundLocation"
                label="Nhặt ở"
              />
            </>
          ) : formData!.type === PostType.GIVE_AWAY_OLD_ITEM ? (
            <>
              <FormInput
                control={form.control}
                name="category"
                label="Thể loại"
              />
              <FormInput
                control={form.control}
                name="condition"
                label="Tình trạng"
              />
            </>
          ) : (
            <></>
          )}
          {/* Gửi đồ cũ */}
          <FormTextarea
            control={form.control}
            name="description"
            label="Mô tả"
          />
          <MultiImageUpload
            control={form.control}
            name="images"
            label="Hình ảnh"
          />{" "}
          {[...listNewItem].length > 0 && (
            <div className="">
              <label htmlFor="" className="font-semibold">
                Danh sách sản phẩm
              </label>
              {[...listNewItem].map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center border rounded-full border-dashed my-2 border-gray-500 bg-gray-200 p-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} sản phẩm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant={"outline"}
                      className="mr-2"
                      onClick={() => {
                        setListNewItem((prev) =>
                          prev.filter((i) => i.name !== item.name)
                        );
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {[...listOldItems].length > 0 && (
            <div className="">
              <label htmlFor="" className="font-semibold">
                Danh sách sản phẩm
              </label>
              {[...listOldItems].map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center border rounded-full border-dashed my-2 border-gray-500 bg-gray-200 p-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} sản phẩm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant={"outline"}
                      className="mr-2"
                      onClick={() => {
                        setListOldItems((prev) =>
                          prev.filter((i) => i.name !== item.name)
                        );
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button onClick={onBack}>Quay lại</Button>
            <Button type="submit">Tiếp tục</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostStep3;

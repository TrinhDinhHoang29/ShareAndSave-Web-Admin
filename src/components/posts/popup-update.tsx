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
import { MultiImageUpload } from "@/components/ui/multi-Image-upload";
import { RadioGroupForm } from "@/components/ui/radio-group-form";
import FormTextarea from "@/components/ui/textarea-form";
import { usePost, useUpdatePost } from "@/hooks/react-query-hooks/use-post";
import {
  UpdatePostDto,
  UpdatePostSchema,
} from "@/schemas/posts/update-post.schema";
import { IPost } from "@/types/models/post.type";
import { PostStatus } from "@/types/status.type";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";

export function PopupUpdatePost({ post }: { post: IPost }) {
  const form = useForm<UpdatePostDto>({
    resolver: zodResolver(UpdatePostSchema),
  });
  const postDetailQuery = usePost(post.id);
  if (postDetailQuery.isSuccess) {
    form.setValue("title", postDetailQuery.data.post.title);
    form.setValue("description", postDetailQuery.data.post.description);
    form.setValue("status", postDetailQuery.data.post.status);
    form.setValue("images", postDetailQuery.data.post.images);
    form.setValue("isFeatured", postDetailQuery.data.post.isFeatured ? 1 : 0);
  }
  const postUpdateMutation = useUpdatePost({
    onSuccess: () => {
      toast.success("Chỉnh sửa thông bài viết dùng thành công");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: UpdatePostDto) => {
    postUpdateMutation.mutate({ id: post.id, data });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* userQuery.isPending || !userQuery.data */}
        {postDetailQuery.isPending || !postDetailQuery.data ? (
          <LoadingSpinner />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((e) => onSubmit(e))}
              className="w-full space-y-8"
            >
              <FormInput
                control={form.control}
                name="title"
                label="Tiêu đề bài viết"
              />

              <FormTextarea
                control={form.control}
                name="description"
                label="Mô tả bài viết"
              />
              <RadioGroupForm
                control={form.control}
                name="isFeatured"
                label="Nổi bật"
                data={[
                  {
                    value: 1,
                    display: "Có",
                  },
                  {
                    value: 0,
                    display: "Không",
                  },
                ]}
              />
              <RadioGroupForm
                control={form.control}
                name="status"
                label="Trạng thái"
                data={[
                  {
                    display: "Đã duyệt",
                    value: PostStatus.APPROVED,
                  },
                  {
                    display: "Chờ duyệt",
                    value: PostStatus.PENDING,
                  },
                  {
                    display: "Từ chối",
                    value: PostStatus.REJECTED,
                  },
                ]}
              />
              <div className="py-4">
                <MultiImageUpload
                  control={form.control}
                  name="images"
                  label="Ảnh bài viết"
                />
              </div>
              <div className="">
                <Button type="submit" className="w-full">
                  Xác nhận
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

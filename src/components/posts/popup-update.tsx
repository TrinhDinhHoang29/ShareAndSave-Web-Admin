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
import { RadioGroupForm } from "@/components/ui/radio-group-form";
import { SingleImageUpload } from "@/components/ui/single-image-upload";
import { useUpdateUser } from "@/hooks/react-query-hooks/use-users";
import {
  UpdateUserDto,
  UpdateUserSchema,
} from "@/schemas/users/update-user.schema";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import { IPost } from "@/types/post.type";
import {
  UpdatePostDto,
  UpdatePostSchema,
} from "@/schemas/posts/update-post.schema";
import { usePost, useUpdatePost } from "@/hooks/react-query-hooks/use-post";
import FormTextarea from "@/components/ui/textarea-form";
import { MultiImageUpload } from "@/components/ui/multi-Image-upload";
import { PostStatus } from "@/types/status.type";

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

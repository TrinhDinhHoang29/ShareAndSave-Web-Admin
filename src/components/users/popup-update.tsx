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
import { useUpdateUser, useUser } from "@/hooks/react-query-hooks/use-users";
import {
  UpdateUserDto,
  UpdateUserSchema,
} from "@/schemas/users/update-user.schema";
import { RadioGroupForm } from "@/components/ui/radio-group-form";
import { SingleImageUpload } from "@/components/ui/single-image-upload";
import { toast } from "sonner";
import { SquarePen } from "lucide-react";

export function PopupUpdateUser({ id }: { id: string }) {
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema),
  });
  const userQuery = useUser(id);
  if (userQuery.isSuccess) {
    form.setValue("id", userQuery.data.client.id);
    form.setValue("fullName", userQuery.data.client.fullName);
    form.setValue("goodPoint", userQuery.data.client.goodPoint);
    form.setValue("phoneNumber", userQuery.data.client.phoneNumber);
    form.setValue("avatar", userQuery.data.client.avatar);
    form.setValue("address", userQuery.data.client.address);
    form.setValue("major", userQuery.data.client.major);
    form.setValue("status", userQuery.data.client.status);
  }
  const userUpdateMutation = useUpdateUser({});
  const onSubmit = (data: UpdateUserDto) => {
    userUpdateMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Chỉnh sửa thông tin người dùng thành công");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {userQuery.isPending || !userQuery.data ? (
          <LoadingSpinner />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormInput
                control={form.control}
                name="fullName"
                label="Họ và tên"
              />
              <FormInput
                control={form.control}
                name="goodPoint"
                label="Điểm tốt"
                type="number"
              />
              <FormInput
                control={form.control}
                name="phoneNumber"
                label="Số điện thoại "
              />
              <FormInput
                control={form.control}
                name="major"
                label="Chuyên ngành"
              />
              <FormInput
                control={form.control}
                name="address"
                label="Địa chỉ "
              />
              <RadioGroupForm
                control={form.control}
                name="status"
                label="Trạng thái"
                data={[
                  {
                    display: "Hoạt động",
                    value: 2,
                  },
                  {
                    display: "Dừng hoạt động",
                    value: 3,
                  },
                ]}
              />
              <SingleImageUpload
                control={form.control}
                name="avatar"
                label="Ảnh đại diện"
              />
              <div className="text-center">
                <Button type="submit">Xác nhận</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

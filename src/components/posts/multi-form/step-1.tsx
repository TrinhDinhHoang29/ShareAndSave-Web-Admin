import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import {
  CreatePostPersonalInfoDto,
  CreatePostPersonalInfoSchema,
} from "@/schemas/posts/create-post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
type Props = {
  onNext: (data: CreatePostPersonalInfoDto) => void;
  onBack: () => void;
};

const CreatePostStep1 = ({ onNext, onBack }: Props) => {
  const form = useForm<CreatePostPersonalInfoDto>({
    resolver: zodResolver(CreatePostPersonalInfoSchema),
  });
  const onSubmit = (data: CreatePostPersonalInfoDto) => {
    onNext(data);
  };
  return (
    <div className="mx-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Nhập thông tin cá nhân
        </h2>
        <p className="text-gray-600">
          Vui lòng chọn loại bài đăng phù hợp với nội dung của bạn
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormInput control={form.control} name="fullName" label="Họ và tên" />
          <FormInput control={form.control} name="email" label="Email" />
          <FormInput
            control={form.control}
            name="phoneNumber"
            label="Số điện thoại "
          />

          <div className="flex justify-between items-center">
            <Button onClick={onBack}>Quay lại</Button>
            <Button type="submit">Tiếp tục</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostStep1;

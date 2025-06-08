import { Main } from "@/components/layout/main";
import CreatePostStep2 from "@/components/posts/multi-form/step-2";
import CreatePostStep3 from "@/components/posts/multi-form/step-3";
import { StepProgress } from "@/components/posts/multi-form/step-progress";
import { useCreatePost } from "@/hooks/react-query-hooks/use-post";
import {
  CreatePostDto,
  CreatePostInfoDto,
  CreatePostTypeDto,
} from "@/schemas/posts/create-post.schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useConfirm } from "use-confirm-hook";
export type FormData = CreatePostInfoDto & CreatePostTypeDto;

const CreatePostPage = () => {
  const [step, setStep] = useState(1);
  const { ask } = useConfirm();
  const [formData, setFormData] = useState<FormData>();
  const handleNextStep = (data: any) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };
  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };
  const navigate = useNavigate();
  const createPostMutation = useCreatePost({
    onSuccess: () => {
      toast.success("Tạo bài viết thành công");
      navigate("/posts");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi hệ thống");
    },
  });
  const submitAll = async (data: CreatePostInfoDto) => {
    const res = await ask("Bạn có chắc chắn muốn tạo bài viết này?");
    if (res) {
      const finalData: FormData = { ...formData, ...data } as FormData;
      const info = JSON.stringify({
        lostDate: finalData.lostDate,
        lostLocation: finalData.lostLocation,
        category: finalData.category,
        condition: finalData.condition,
        reward: finalData.reward,
        foundLocation: finalData.foundLocation,
        foundDate: finalData.foundDate,
      });
      const postData: CreatePostDto = {
        type: finalData.type,
        title: finalData.title,
        description: finalData.description,
        images: finalData.images,
        oldItems: finalData.oldItems,
        newItems: finalData.newItems,
        info: info,
      };
      createPostMutation.mutate(postData);
    }
  };
  return (
    <Main>
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl dark:text-white font-bold text-gray-900">
            Tạo bài đăng mới
          </h1>
          <p className="text-gray-500 mt-1  dark:text-white">
            Tạo ra các bài đăng để truyền thông hoặc tìm kiếm đồ thất lạc
          </p>
        </div>
      </div>
      <div className="flex justify-center my-16">
        <div
          className="sm:w-[80%] w-full p-6 border rounded-2xl"
          style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}
        >
          <StepProgress currentStep={step} />
          <div className="my-4">
            {step === 1 ? (
              <CreatePostStep2
                onBack={handlePrevStep}
                onNext={handleNextStep}
              />
            ) : (
              <CreatePostStep3
                formData={formData}
                onBack={handlePrevStep}
                onNext={submitAll}
              />
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CreatePostPage;

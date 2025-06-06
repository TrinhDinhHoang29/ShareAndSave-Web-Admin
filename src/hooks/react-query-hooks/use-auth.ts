import { getMe, login } from "@/apis/auth.api";
import { LoginDto } from "@/schemas/auths/login.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = (config?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const res = await login(data);
      return res.data!;
    },
    ...config, // spread cho phép config tuỳ biến
  });
};

export const useGetMe = (config?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMe();
      return res.data!;
    },
    enabled: config?.enabled,
  });
};

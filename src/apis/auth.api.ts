import { IAuthUserInfo } from "@/context/auth-context";
import { http } from "@/lib/http";
import { LoginDto } from "@/schemas/auths/login.schema";
import { ILogin } from "@/types/login.type";
import { IResponseApi } from "@/types/response-api.type";

const api = http();

const login = async (data: LoginDto): Promise<IResponseApi<ILogin>> => {
  const response = await api.post("/login", { ...data, device: "web" });
  return response.data;
};

const getMe = async (): Promise<IResponseApi<{ user: IAuthUserInfo }>> => {
  const response = await api.get("/get-me");
  return response.data;
};

const logout = async (): Promise<IResponseApi<null>> => {
  const response = await api.post("/logout");
  return response.data;
};
export { login, logout, getMe };

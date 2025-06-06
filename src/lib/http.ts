import { getAccessToken, getRefreshToken, setAccessToken } from "@/lib/token";
import axios, { AxiosInstance, AxiosResponse } from "axios";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject(error);
  });
  failedQueue = [];
};

export const http = (version: number = 1): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}/v${version}`,
    timeout: 10000,
  });

  // 👉 Interceptor Request – gắn access token
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // 👉 Interceptor Response – xử lý 401 và refresh
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                resolve(axios(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();

        try {
          // 👉 Gửi refreshToken trong header
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_API_URL}/auth/refresh-token`,
            {
              refreshToken,
            }
          );

          const newToken = res.data.data.jwt;
          setAccessToken(newToken);
          axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
          processQueue(null, newToken);
          originalRequest.headers["Authorization"] = "Bearer " + newToken;

          return axios(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      if (error.response?.status === 500) {
        // Trả lỗi 500
        return Promise.reject({
          message: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
          status: 500,
        });
      }
      // Trả lỗi khác
      return Promise.reject({
        message: error.response?.data?.message.split(":")[0],
        status: error.response?.status,
      });
    }
  );

  return instance;
};

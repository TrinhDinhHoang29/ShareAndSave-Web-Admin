import { http } from "@/lib/http";
import { CreatePostDto } from "@/schemas/posts/create-post.schema";
import { IFilterExtend } from "@/types/filter-api.type";
import { IPost } from "@/types/post.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getPosts = async ({
  searchBy,
  searchValue,
  sort,
  order,
  status,
  type,
  page,
  limit,
}: IFilterExtend): Promise<
  IResponseApi<{ posts: IPost[]; totalPage: number }>
> => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`, {
    params: {
      searchBy,
      searchValue,
      sort,
      order,
      status,
      type,
    },
  });
  return response.data;
};
const createPost = async (
  createItemDto: CreatePostDto
): Promise<IResponseApi<{}>> => {
  const response = await api.post(`/posts`, createItemDto);
  return response.data;
};
export { getPosts, createPost };

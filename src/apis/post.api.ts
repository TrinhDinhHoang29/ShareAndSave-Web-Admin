import { http } from "@/lib/http";
import { CreatePostDto } from "@/schemas/posts/create-post.schema";
import { UpdatePostDto } from "@/schemas/posts/update-post.schema";
import { IFilterExtend } from "@/types/filter-api.type";
import { IPost } from "@/types/models/post.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getPosts = async ({
  searchBy,
  searchValue,
  sort,
  order,
  postOf,
  status,
  type,
  page,
  limit,
}: IFilterExtend): Promise<
  IResponseApi<{ posts: IPost[]; totalPage: number }>
> => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`, {
    params: {
      postOf,
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
const updatePost = async (
  id: number,
  updatePostDto: UpdatePostDto
): Promise<IResponseApi<{}>> => {
  const response = await api.patch(`/posts/${id}`, updatePostDto);
  return response.data;
};
const getPost = async (id: number): Promise<IResponseApi<{ post: IPost }>> => {
  const response = await api.get(`/posts/${id}`);
  console.log("res", response.data);
  return response.data;
};
const deletePost = async (id: number): Promise<IResponseApi<{}>> => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
export { getPosts, createPost, getPost, updatePost, deletePost };

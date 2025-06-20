import { http } from "@/lib/http";
import { IFilterChat } from "@/types/filter-api.type";
import { IMessage } from "@/types/models/message.type";
import { IResponseApi } from "@/types/response-api.type";
const api = http();

const getMessages = async ({
  interestID,
  search,
  page = 1,
  limit = 10,
}: IFilterChat): Promise<IResponseApi<{ messages: IMessage[] }>> => {
  const response = await api.get(`/messages?page=${page}&limit=${limit}`, {
    params: {
      interestID,
      search,
    },
  });
  return response.data;
};

const updateReadMessage = async ({
  interestId,
}: {
  interestId: number;
}): Promise<IResponseApi<{}>> => {
  const response = await api.patch(`/messages/${interestId}`);
  return response.data;
};
export { getMessages, updateReadMessage };

import { NewsResponse } from "@/types/news";
import { httpClient } from "../fetch";

export const getQuickNews = async (params?: {
  category?: string;
  limit?: number;
  page?: number;
}) => {
  const response = await httpClient.get<NewsResponse>(`/news`, {
    params: {
      category: params?.category || "quick_news",
      limit: params?.limit || 9,
      page: params?.page || 1,
    },
  });
  return response.data;
};

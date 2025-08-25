import { NewsResponse } from "@/types/news";
import { httpClient } from "../fetch";

export const getQuickNews = async (params?: {
  category?: string;
  limit?: number;
  page?: number;
  language?: string;
}) => {
  const response = await httpClient.get<NewsResponse>(`/news`, {
    params: {
      category: params?.category || "quick_news",
      limit: params?.limit || 9,
      page: params?.page || 1,
      language: params?.language || "zh-CN",
    },
  });
  return response.data;
};

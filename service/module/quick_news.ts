import { httpClient } from "../fetch";

import { News, NewsResponse } from "@/types/news";

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

export const getNewsById = async (id: string) => {
  const response = await httpClient.get<News>(`/news/${id}`, {});

  return response.data;
};

export const getNewsShareImage = async (params?: { uuid: string }) => {
  const response = await httpClient.get<NewsResponse>(
    `/news/${params?.uuid}/share`
  );

  return response.data;
};

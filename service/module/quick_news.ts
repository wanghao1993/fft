import { httpClient } from "../fetch";

import { News, NewsResponse } from "@/types/news";

export const getQuickNews = async (params: {
  category: string;
  limit?: number;
  title?: string;
  page?: number;
  language: string;
}) => {
  const { category, limit, title, page, language } = params;
  const response = await httpClient.get<NewsResponse>(`/news`, {
    params: {
      title,
      category,
      limit: limit || 9,
      page: page || 1,
      language: language,
    },
  });

  return response.data;
};

export const getNewsById = async (id: string) => {
  const response = await httpClient.get<News>(`/news/${id}`, {});

  return response.data;
};

export const getNewsShareImage = async (params?: { uuid: string }) => {
  const response = await httpClient.get<Blob>(`/news/${params?.uuid}/share`, {
    responseType: "blob",
  });

  return response.data;
};

export const deleteById = async (id: string) => {
  const response = await httpClient.delete<News>(`/news/${id}`, {});

  return response.data;
};

export const updateNewsById = async (id: string, data: Partial<News>) => {
  const response = await httpClient.patch<News>(`/news/${id}`, data);

  return response.data;
};

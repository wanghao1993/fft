import { httpClient } from "../fetch";

import { CreateNewsResource, NewsResource } from "@/types/news_resource";

// 获取所有的新闻资源
export const getNewsResource = async () => {
  const response = await httpClient.get<NewsResource[]>(`/news-resouce`);

  return response.data;
};

// 创建新闻资源
export const createNewsResource = async (data: CreateNewsResource) => {
  const response = await httpClient.post<NewsResource>(`/news-resouce`, data);

  return response.data;
};

// 更新新闻资源
export const updateNewsResource = async (id: string, data: any) => {
  const response = await httpClient.patch<any>(`/news-resouce/${id}`, data);

  return response.data;
};

// 删除新闻资源
export const deleteNewsResource = async (id: string) => {
  const response = await httpClient.delete<any>(`/news-resouce/${id}`);

  return response.data;
};

export const getNewsResourceById = async (id: string) => {
  const response = await httpClient.get<NewsResource>(`/news-resouce/${id}`);

  return response.data;
};

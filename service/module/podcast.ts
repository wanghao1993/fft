import { httpClient } from "../fetch";

import { GetPodcastResponse, Podcast } from "@/types/podcast";
import { CreatePodcast } from "@/types/podcast";

// 获取播客列表（分页）
export const getPodcast = async (params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  platform?: string;
  language?: string;
}) => {
  const response = await httpClient.get<GetPodcastResponse>(`/podcast`, {
    params,
  });

  return response.data;
};

// 创建播客资源
export const createPodcast = async (data: CreatePodcast) => {
  const response = await httpClient.post<Podcast>(`/podcast`, data);

  return response.data;
};

// 更新播客资源
export const updatePodcast = async (id: string, data: any) => {
  const response = await httpClient.patch<any>(`/podcast/${id}`, data);

  return response.data;
};

// 删除播客资源
export const deletePodcast = async (id: string) => {
  const response = await httpClient.delete<any>(`/podcast/${id}`);

  return response.data;
};

export const getPodcastById = async (id: string) => {
  const response = await httpClient.get<Podcast>(`/podcast/${id}`);

  return response.data;
};

import { httpClient } from "../fetch";

import {
  CreatePodcastResource,
  PodcastResource,
} from "@/types/podcast_resource";

// 获取所有的播客资源
export const getPodcastResource = async () => {
  const response = await httpClient.get<PodcastResource[]>(`/podcast-resource`);

  return response.data;
};

// 创建播客资源
export const createPodcastResource = async (data: CreatePodcastResource) => {
  const response = await httpClient.post<CreatePodcastResource>(
    `/podcast-resource`,
    data
  );

  return response.data;
};

// 更新播客资源
export const updatePodcastResource = async (id: string, data: any) => {
  const response = await httpClient.patch<any>(`/podcast-resource/${id}`, data);

  return response.data;
};

// 删除播客资源
export const deletePodcastResource = async (id: string) => {
  const response = await httpClient.delete<any>(`/podcast-resource/${id}`);

  return response.data;
};

export const getPodcastResourceById = async (id: string) => {
  const response = await httpClient.get<PodcastResource>(
    `/podcast-resource/${id}`
  );

  return response.data;
};

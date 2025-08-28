import { httpClient } from "../fetch";

import { TagFormData, TagResponse } from "@/types/tag";

export const getTags = async () => {
  const response = await httpClient.get<TagResponse>(`/tags`);

  return response.data;
};

export const createTag = async (data: TagFormData) => {
  const response = await httpClient.post<TagResponse>(`/tags`, data);

  return response.data;
};

export const updateTag = async (id: string, data: TagFormData) => {
  const response = await httpClient.patch<TagResponse>(`/tags/${id}`, data);

  return response.data;
};

export const deleteTag = async (id: string) => {
  const response = await httpClient.delete<TagResponse>(`/tags/${id}`);

  return response.data;
};

export const toggleTagStatus = async (id: string, isActive: boolean) => {
  const response = await httpClient.patch<TagResponse>(`/tags/${id}/status`, {
    isActive,
  });

  return response.data;
};

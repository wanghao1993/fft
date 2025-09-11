import { httpClient } from "../fetch";

import { CreateVideoResource, VideoResource } from "@/types/video_resource";

// 获取所有的视频资源
export const getVideoResource = async () => {
  const response = await httpClient.get<VideoResource[]>(`/video-resouce`);

  return response.data;
};

// 创建视频资源
export const createVideoResource = async (data: CreateVideoResource) => {
  const response = await httpClient.post<CreateVideoResource>(
    `/video-resouce`,
    data
  );

  return response.data;
};

// 更新视频资源
export const updateVideoResource = async (id: string, data: any) => {
  const response = await httpClient.patch<any>(`/video-resouce/${id}`, data);

  return response.data;
};

// 删除视频资源
export const deleteVideoResource = async (id: string) => {
  const response = await httpClient.delete<any>(`/video-resouce/${id}`);

  return response.data;
};

export const getVideoResourceById = async (id: string) => {
  const response = await httpClient.get<VideoResource>(`/video-resouce/${id}`);

  return response.data;
};

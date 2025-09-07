import { httpClient } from "../fetch";

import { Video, VideoResponse } from "@/types/videos";

export const getVideos = async (params?: {
  title?: string;
  category?: string;
  limit?: number;
  page?: number;
  language?: string;
}) => {
  const { title, category, limit, page, language } = params || {};

  const response = await httpClient.get<VideoResponse>(`/videos`, {
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

export const deleteVideo = async (id: string) => {
  const response = await httpClient.delete(`/videos/${id}`);

  return response.data;
};

export const updateVideoById = async (id: string, data: Partial<Video>) => {
  const response = await httpClient.patch<Video>(`/videos/${id}`, data);

  return response.data;
};

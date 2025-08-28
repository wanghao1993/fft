import { httpClient } from "../fetch";

import { VideoResponse } from "@/types/videos";

export const getVideos = async (params?: {
  category?: string;
  limit?: number;
  page?: number;
  language?: string;
}) => {
  const response = await httpClient.get<VideoResponse>(`/videos`, {
    params: {
      category: params?.category || "podcast",
      limit: params?.limit || 9,
      page: params?.page || 1,
      language: params?.language || "zh-CN",
    },
  });

  return response.data;
};

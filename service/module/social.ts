import { httpClient } from "../fetch";
import { Social, CreateSocialData, UpdateSocialData } from "../../types/social";

const BASE_URL = "/social";

export const getSocials = async (): Promise<Social[]> => {
  const response = await httpClient.get<Social[]>(`${BASE_URL}`);

  return response.data;
};

export const createSocail = async (data: {
  platform: string;
  url: string;
  isActive: boolean;
}): Promise<Social[]> => {
  const response = await httpClient.post<Social[]>(`${BASE_URL}`, data);

  return response.data;
};

export const getSocialById = async (id: string): Promise<Social> => {
  const response = await httpClient.get<Social>(`${BASE_URL}/${id}`);

  return response.data;
};

export const createSocial = async (data: CreateSocialData): Promise<Social> => {
  const response = await httpClient.post<Social>(`${BASE_URL}`, data);

  return response.data;
};

export const updateSocialById = async (
  id: string,
  data: UpdateSocialData
): Promise<Social> => {
  const response = await httpClient.put<Social>(`${BASE_URL}/${id}`, data);

  return response.data;
};

export const deleteSocialById = async (id: string): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${id}`);
};

export const toggleSocialStatus = async (
  id: string,
  isActive: boolean
): Promise<Social> => {
  const response = await httpClient.patch<Social>(`${BASE_URL}/${id}/status`, {
    isActive,
  });

  return response.data;
};

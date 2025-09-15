import { httpClient } from "../fetch";
import { About, CreateAboutData, UpdateAboutData } from "../../types/about";

const BASE_URL = "/about";

export const getAbout = async (locale?: string): Promise<About[]> => {
  const response = await httpClient.get<About[]>(
    `${BASE_URL}?language=${locale}`
  );

  return response.data;
};

export const getAboutById = async (id: string): Promise<About> => {
  const response = await httpClient.get<About>(`${BASE_URL}/${id}`);

  return response.data;
};

export const createAbout = async (data: CreateAboutData): Promise<About> => {
  const response = await httpClient.post<About>(`${BASE_URL}`, data);

  return response.data;
};

export const updateAboutById = async (
  id: string,
  data: UpdateAboutData
): Promise<About> => {
  const response = await httpClient.put<About>(`${BASE_URL}/${id}`, data);

  return response.data;
};

export const deleteAboutById = async (
  id: string,
  sequence: number
): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${id}?sequence=${sequence}`);
};

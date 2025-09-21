import { httpClient } from "../fetch";

import {
  CreateInterviewData,
  Interview,
  UpdateInterviewData,
} from "@/types/interview";

const BASE_URL = "/interview";

export const getInterviews = async (locale?: string): Promise<Interview[]> => {
  const response = await httpClient.get<Interview[]>(`${BASE_URL}`, {
    params: {
      language: locale,
    },
  });

  return response.data;
};

export const createInterview = async (
  data: CreateInterviewData
): Promise<Interview[]> => {
  const response = await httpClient.post<Interview[]>(`${BASE_URL}`, data);

  return response.data;
};

export const getInterviewById = async (id: string): Promise<Interview> => {
  const response = await httpClient.get<Interview>(`${BASE_URL}/${id}`);

  return response.data;
};

export const updateInterviewById = async (
  id: string,
  data: UpdateInterviewData
): Promise<Interview> => {
  const response = await httpClient.patch<Interview>(`${BASE_URL}/${id}`, data);

  return response.data;
};

export const deleteInterviewById = async (id: string): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${id}`);
};

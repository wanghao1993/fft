import { httpClient } from "../fetch";

import {
  CreatePartnerData,
  Partner,
  UpdatePartnerData,
} from "@/types/partners";

const BASE_URL = "/partners";

export const getPartners = async (): Promise<Partner[]> => {
  const response = await httpClient.get<Partner[]>(`${BASE_URL}`);

  return response.data;
};

export const createPartner = async (
  data: CreatePartnerData
): Promise<Partner[]> => {
  const response = await httpClient.post<Partner[]>(`${BASE_URL}`, data);

  return response.data;
};

export const getPartnerById = async (id: string): Promise<Partner> => {
  const response = await httpClient.get<Partner>(`${BASE_URL}/${id}`);

  return response.data;
};

export const updatePartnerById = async (
  id: string,
  data: UpdatePartnerData
): Promise<Partner> => {
  const response = await httpClient.patch<Partner>(`${BASE_URL}/${id}`, data);

  return response.data;
};

export const deletePartnerById = async (id: string): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${id}`);
};

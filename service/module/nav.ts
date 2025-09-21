import { httpClient } from "../fetch";
import {
  Nav,
  CreateNavData,
  UpdateNavData,
  NavSortData,
} from "../../types/nav";

const BASE_URL = "/nav";

export const getNavs = async (): Promise<Nav[]> => {
  const response = await httpClient.get<Nav[]>(BASE_URL);

  return response.data;
};

export const getVisibleNavs = async (): Promise<Nav[]> => {
  const response = await httpClient.get<Nav[]>(`${BASE_URL}/visible`);

  return response.data;
};

export const getNavById = async (id: string): Promise<Nav> => {
  const response = await httpClient.get<Nav>(`${BASE_URL}/${id}`);

  return response.data;
};

export const getNavsByParentId = async (parentId: string): Promise<Nav[]> => {
  const response = await httpClient.get<Nav[]>(
    `${BASE_URL}/parent/${parentId}`
  );

  return response.data;
};

export const createNav = async (data: CreateNavData): Promise<Nav> => {
  const response = await httpClient.post<Nav>(BASE_URL, data);

  return response.data;
};

export const updateNav = async (
  id: string,
  data: UpdateNavData
): Promise<Nav> => {
  const response = await httpClient.patch<Nav>(`${BASE_URL}/${id}`, data);

  return response.data;
};

export const deleteNav = async (id: string): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${id}`);
};

export const updateNavSort = async (data: NavSortData[]): Promise<void> => {
  await httpClient.put(`${BASE_URL}/sort`, data);
};

export const toggleNavVisibility = async (id: string): Promise<Nav> => {
  const response = await httpClient.patch<Nav>(
    `${BASE_URL}/${id}/toggle-visibility`
  );

  return response.data;
};

import { httpClient } from "../fetch";

import { LoginRes } from "@/types/auth";

export const Login = async (data: { username: string; password: string }) => {
  const response = await httpClient.post<LoginRes>(`/auth/login`, {
    ...data,
  });

  return response.data;
};

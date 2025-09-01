import { httpClient } from "../fetch";

import { UploadResponse } from "@/types/file";

export const uploadImage = async (file: File) => {
  const data = new FormData();

  data.append("file", file);
  const response = await httpClient.post<UploadResponse>(
    `/upload/image`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

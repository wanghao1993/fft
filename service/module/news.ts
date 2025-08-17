import { httpClient } from "../fetch";

export const getNews = async () => {
  const response = await httpClient.get("/news.php?limit=10");
  return response.data.items;
};

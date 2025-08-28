import { HttpClient } from "../fetch";

import { BlogRes } from "@/types/blog";

const httpClient = new HttpClient("/php");

const getCarousel = async () => {
  const res = await httpClient.get<BlogRes>("/api/blog.php");

  return res.data;
};

export { getCarousel };

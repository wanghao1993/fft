import { HttpClient } from "../fetch";

import { BlogRes } from "@/types/blog";

const httpClient = new HttpClient("https://futurefrontier.ai");

const getCarousel = async (limit?: number) => {
  const res = await httpClient.get<BlogRes>("/api/blog.php", {
    params: {
      limit: limit || 3,
    },
  });

  return res.data;
};

export { getCarousel };

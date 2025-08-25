import { BlogRes } from "@/types/blog";
import { HttpClient } from "../fetch";

const httpClient = new HttpClient("/php");

const getCarousel = async () => {
  const res = await httpClient.get<BlogRes>("/api/blog.php");
  return res.data;
};

export { getCarousel };

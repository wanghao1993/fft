import { httpClient } from "../fetch";

import { Article, BlogRes } from "@/types/blog";

const getBlogs = async (params?: { limit?: number; page?: number }) => {
  const res = await httpClient.get<BlogRes>("/blogs", {
    params: {
      limit: params?.limit || 3,
      page: params?.page || 1,
    },
  });

  return res.data;
};

const getBlogById = async (id: string) => {
  const res = await httpClient.get<Article>(`/blogs/${id}`);

  return res.data;
};

const createBlog = async (
  data: Omit<
    Article,
    "id" | "createdAt" | "updatedAt" | "viewCount" | "likeCount"
  >
) => {
  const res = await httpClient.post<Article>(`/blogs`, data);

  return res.data;
};

const updateBlog = async (
  data: Omit<
    Article,
    "id" | "createdAt" | "updatedAt" | "viewCount" | "likeCount"
  >,
  id: string
) => {
  const res = await httpClient.patch<Article>(`/blogs/${id}`, data);

  return res.data;
};

const deleteBlog = async (id: string) => {
  const res = await httpClient.delete<Article>(`/blogs/${id}`);

  return res.data;
};

const addViewCount = async (id: string) => {
  const res = await httpClient.post<Article>(`/blogs/${id}/view`);

  return res.data;
};

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addViewCount,
};

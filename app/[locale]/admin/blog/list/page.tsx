"use client";
import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import ArticleTable from "@/components/admin/ArticleTable";
import { Toast } from "@/components/ui/Toast";
import { deleteBlog, getBlogs } from "@/service/module/carousel";
import { Article, BlogRes } from "@/types/blog";
import Pagination from "@/components/admin/Pagination";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast, toasts } = useToast();
  const [pagi, setPagi] = useState<Omit<BlogRes, "data">>();
  const [currentPage, setCurrentPage] = useState(1);

  const getAllBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await getBlogs({
        limit: 20,
        page: currentPage,
      });

      setPagi(response);

      setArticles(response.data);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: "加在文章列表失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [currentPage]);

  const onDelete = async (id: string) => {
    await deleteBlog(id);
    getAllBlogs();
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <AuthWrapper>
      <ArticleTable
        articles={articles}
        isLoading={isLoading}
        onDelete={onDelete}
      />
      <Pagination
        currentPage={pagi?.page || 0}
        hasNext={pagi?.hasNext || false}
        hasPrev={pagi?.hasPrev || false}
        total={pagi?.total || 0}
        totalPages={pagi?.totalPages || 0}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      {/* Toast 通知 */}
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} {...toastItem} />
      ))}
    </AuthWrapper>
  );
}

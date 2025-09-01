"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import ArticleTable from "@/components/admin/ArticleTable";
import TagForm from "@/components/admin/TagForm";
import {
  createTag,
  deleteTag,
  toggleTagStatus,
  updateTag,
} from "@/service/module/tag";
import { Tag, TagFormData } from "@/types/tag";
import { Toast } from "@/components/ui/Toast";
import { getBlogs } from "@/service/module/carousel";
import { Article } from "@/types/blog";

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast, toasts } = useToast();

  const getAllBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await getBlogs();

      setArticles(response.data);
    } catch (error) {
      console.error("加在文章列表失敗:", error);
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
  }, []);

  const handleAdd = () => {
    setEditingTag(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: TagFormData) => {
    try {
      setIsSubmitting(true);

      if (editingTag) {
        await updateTag(editingTag.id, data);
        toast.success({
          title: "成功",
          description: "标签更新成功",
        });
        getAllBlogs();
      } else {
        // 创建标签时需要包含 name 字段
        const createData = {
          name: data.name,
          nameEn: data.nameEn,
          nameZh: data.nameZh,
          isActive: data.isActive,
        };

        await createTag(createData);
        toast.success({
          title: "成功",
          description: "标签创建成功",
        });
        getAllBlogs();
      }

      setIsFormOpen(false);
    } catch (error) {
      console.error("操作失败:", error);
      toast.error({
        title: "错误",
        description: editingTag ? "更新失败" : "创建失败",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id);
      toast.success({
        title: "成功",
        description: "标签删除成功",
      });
      getAllBlogs();
    } catch (error) {
      console.error("删除失败:", error);
      toast.error({
        title: "错误",
        description: "删除标签失败",
      });
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      await toggleTagStatus(id, isActive);
      toast.success({
        title: "成功",
        description: `标签已${isActive ? "启用" : "禁用"}`,
      });
      getAllBlogs();
    } catch (error) {
      console.error("状态更新失败:", error);
      toast.error({
        title: "错误",
        description: "更新标签状态失败",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <ArticleTable
        articles={articles}
        isLoading={isLoading}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <TagForm
        isLoading={isSubmitting}
        isOpen={isFormOpen}
        tag={editingTag}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Toast 通知 */}
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} {...toastItem} />
      ))}
    </div>
  );
}

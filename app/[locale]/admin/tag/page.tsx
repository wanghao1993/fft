"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import TagTable from "@/components/admin/TagTable";
import TagForm from "@/components/admin/TagForm";
import {
  createTag,
  deleteTag,
  getTags,
  toggleTagStatus,
  updateTag,
} from "@/service/module/tag";
import { Tag, TagFormData } from "@/types/tag";
import { Toast } from "@/components/ui/Toast";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function AdminTagPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast, toasts } = useToast();

  const getTagList = async () => {
    setIsLoading(true);
    try {
      const response = await getTags();

      setTags(response);
    } catch (error) {
      console.error("加载标签失败:", error);
      toast.error({
        title: "错误",
        description: "加载标签失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTagList();
  }, []);

  const handleAdd = () => {
    setEditingTag(null);
    setIsFormOpen(true);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
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
        getTagList();
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
        getTagList();
      }

      setIsFormOpen(false);
    } catch (error) {
      console.error("操作失败:", error);
      toast.error({
        title: "错误",
        description: editingTag ? "更新标签失败" : "创建标签失败",
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
      getTagList();
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
      getTagList();
    } catch (error) {
      console.error("状态更新失败:", error);
      toast.error({
        title: "错误",
        description: "更新标签状态失败",
      });
    }
  };

  return (
    <AuthWrapper>
      <div className="container mx-auto py-8 px-4">
        <TagTable
          isLoading={isLoading}
          tags={tags}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
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
    </AuthWrapper>
  );
}

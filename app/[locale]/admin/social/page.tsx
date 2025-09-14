"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import AuthWrapper from "@/components/admin/AuthWrapper";
import SocialTable from "@/components/admin/SocialTable";
import SocialForm from "@/components/admin/SocialForm";
import {
  getSocials,
  createSocial,
  updateSocialById,
  deleteSocialById,
  toggleSocialStatus,
} from "@/service/module/social";
import { Social, SocialFormData } from "@/types/social";

export default function AdminSocialPage() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<Social | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const loadSocials = async () => {
    try {
      setIsLoading(true);
      const data = await getSocials();

      setSocials(data);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "加载社交媒体数据失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSocials();
  }, []);

  const handleAdd = () => {
    setEditingSocial(null);
    setIsFormOpen(true);
  };

  const handleEdit = (social: Social) => {
    setEditingSocial(social);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingSocial(null);
  };

  const handleFormSubmit = async (data: SocialFormData) => {
    try {
      setIsSubmitting(true);
      if (editingSocial) {
        await updateSocialById(editingSocial.id, data);
        toast.success({
          title: "成功",
          description: "社交媒体更新成功",
        });
      } else {
        await createSocial(data);
        toast.success({
          title: "成功",
          description: "社交媒体创建成功",
        });
      }
      await loadSocials();
      handleFormClose();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "操作失败",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSocialById(id);
      toast.success({
        title: "成功",
        description: "社交媒体删除成功",
      });
      await loadSocials();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "删除失败",
      });
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      await toggleSocialStatus(id, isActive);
      toast.success({
        title: "成功",
        description: `社交媒体已${isActive ? "启用" : "禁用"}`,
      });
      await loadSocials();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "状态更新失败",
      });
    }
  };

  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <SocialTable
          socials={socials}
          isLoading={isLoading}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
        />

        <SocialForm
          isOpen={isFormOpen}
          isLoading={isSubmitting}
          social={editingSocial}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AuthWrapper>
  );
}

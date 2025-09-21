"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import AuthWrapper from "@/components/admin/AuthWrapper";
import PartnerTable from "@/components/admin/PartnerTable";
import PartnerForm from "@/components/admin/PartnerForm";
import {
  deletePartnerById,
  getPartners,
  updatePartnerById,
} from "@/service/module/partners";
import { Partner, PartnerFormData } from "@/types/partners";
import { createPartner } from "@/service/module/partners";

export default function AdminSocialPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const loadPartners = async () => {
    try {
      setIsLoading(true);
      const data = await getPartners();

      setPartners(data);
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
    loadPartners();
  }, []);

  const handleAdd = () => {
    setEditingPartner(null);
    setIsFormOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPartner(null);
  };

  const handleFormSubmit = async (data: PartnerFormData) => {
    try {
      setIsSubmitting(true);
      if (editingPartner) {
        await updatePartnerById(editingPartner.id, data);
        toast.success({
          title: "成功",
          description: "社交媒体更新成功",
        });
      } else {
        await createPartner(data);
        toast.success({
          title: "成功",
          description: "社交媒体创建成功",
        });
      }
      await loadPartners();
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
      await deletePartnerById(id);
      toast.success({
        title: "成功",
        description: "合作伙伴删除成功",
      });
      await loadPartners();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "删除失败",
      });
    }
  };

  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <PartnerTable
          partners={partners}
          isLoading={isLoading}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <PartnerForm
          isOpen={isFormOpen}
          isLoading={isSubmitting}
          partner={editingPartner}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AuthWrapper>
  );
}

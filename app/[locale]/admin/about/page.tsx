"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import AuthWrapper from "@/components/admin/AuthWrapper";
import AboutTable from "@/components/admin/AboutTable";
import AboutForm from "@/components/admin/AboutForm";
import {
  getAbout,
  createAbout,
  updateAboutById,
  deleteAboutById,
} from "@/service/module/about";
import { About, AboutFormData } from "@/types/about";

export default function AdminAboutPage() {
  const [abouts, setAbouts] = useState<About[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAbout, setEditingAbout] = useState<About | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const loadAbouts = async () => {
    try {
      setIsLoading(true);
      const data = await getAbout("");

      setAbouts(data);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "加载关于我们数据失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAbouts();
  }, []);

  const handleAdd = () => {
    setEditingAbout(null);
    setIsFormOpen(true);
  };

  const handleEdit = (about: About) => {
    setEditingAbout(about);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAbout(null);
  };

  const handleFormSubmit = async (data: AboutFormData) => {
    try {
      setIsSubmitting(true);
      if (editingAbout) {
        await updateAboutById(editingAbout.id, {
          ...data,
          sequence: editingAbout.sequence,
        });
        toast.success({
          title: "成功",
          description: "关于我们更新成功",
        });
      } else {
        await createAbout(data);
        toast.success({
          title: "成功",
          description: "关于我们创建成功",
        });
      }
      await loadAbouts();
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
      await deleteAboutById(id);
      toast.success({
        title: "成功",
        description: "关于我们删除成功",
      });
      await loadAbouts();
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
        <AboutTable
          abouts={abouts}
          isLoading={isLoading}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <AboutForm
          isOpen={isFormOpen}
          isLoading={isSubmitting}
          about={editingAbout}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AuthWrapper>
  );
}

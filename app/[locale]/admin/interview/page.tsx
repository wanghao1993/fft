"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/components/ui/Toast";
import AuthWrapper from "@/components/admin/AuthWrapper";
import InterviewTable from "@/components/admin/InterviewTable";
import InterviewForm from "@/components/admin/InterviewForm";
import {
  deleteInterviewById,
  getInterviews,
  updateInterviewById,
} from "@/service/module/interview";
import { Interview, InterviewFormData } from "@/types/interview";
import { createInterview } from "@/service/module/interview";

export default function AdminInterviewPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const loadInterviews = async () => {
    try {
      setIsLoading(true);
      const data = await getInterviews();

      setInterviews(data);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "加载访谈数据失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleAdd = () => {
    setEditingInterview(null);
    setIsFormOpen(true);
  };

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingInterview(null);
  };

  const handleFormSubmit = async (data: InterviewFormData) => {
    try {
      setIsSubmitting(true);
      if (editingInterview) {
        await updateInterviewById(editingInterview.id, data);
        toast.success({
          title: "成功",
          description: "访谈更新成功",
        });
      } else {
        await createInterview(data);
        toast.success({
          title: "成功",
          description: "访谈创建成功",
        });
      }
      await loadInterviews();
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
      await deleteInterviewById(id);
      toast.success({
        title: "成功",
        description: "访谈删除成功",
      });
      await loadInterviews();
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
        <InterviewTable
          interviews={interviews}
          isLoading={isLoading}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <InterviewForm
          isOpen={isFormOpen}
          isLoading={isSubmitting}
          interview={editingInterview}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AuthWrapper>
  );
}

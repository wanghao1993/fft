"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";

import { InterviewFormData, Interview } from "@/types/interview";
import { Radio, RadioGroup } from "@heroui/radio";

interface InterviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormData) => void;
  interview?: InterviewFormData | null;
  isLoading?: boolean;
}

export default function InterviewForm({
  isOpen,
  onClose,
  onSubmit,
  interview,
  isLoading = false,
}: InterviewFormProps) {
  const [formData, setFormData] = useState<InterviewFormData>({
    title: "",
    cover: "",
    url: "",
    language: "zh-CN",
  });

  useEffect(() => {
    if (interview) {
      setFormData({
        title: interview.title,
        cover: interview.cover,
        url: interview.url,
        language: interview.language,
      });
    } else {
      setFormData({
        title: "",
        cover: "",
        url: "",
        language: "zh-CN",
      });
    }
  }, [interview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof InterviewFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      title: "",
      cover: "",
      url: "",
      language: "zh-CN",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="4xl"
      onClose={handleClose}
      isDismissable={false}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{interview ? "编辑访谈" : "新增访谈"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="title"
                >
                  标题 *
                </label>
                <Input
                  required
                  placeholder="请输入访谈标题"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">请输入访谈标题</p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="language"
                >
                  语言
                </label>
                <RadioGroup
                  label="选择语言"
                  value={formData.language}
                  onValueChange={(e: string) =>
                    handleInputChange("language", e)
                  }
                >
                  <Radio value="zh-CN">中文</Radio>
                  <Radio value="en">English</Radio>
                </RadioGroup>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="cover"
                >
                  封面图片URL
                </label>
                <Input
                  placeholder="请输入封面图片URL"
                  value={formData.cover}
                  onChange={(e) => handleInputChange("cover", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  请输入完整的图片URL地址
                </p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="url"
                >
                  链接
                </label>
                <Input
                  required
                  placeholder="请输入访谈链接"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  请输入完整的访谈链接URL
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              取消
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              {interview ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

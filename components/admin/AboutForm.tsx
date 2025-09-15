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
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { About, AboutFormData } from "../../types/about";

interface AboutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AboutFormData) => void;
  about?: About | null;
  isLoading?: boolean;
}

export default function AboutForm({
  isOpen,
  onClose,
  onSubmit,
  about,
  isLoading = false,
}: AboutFormProps) {
  const [formData, setFormData] = useState<AboutFormData>({
    module: "",
    content: "",
    language: "",
  });

  useEffect(() => {
    if (about) {
      setFormData({
        module: about.module,
        content: about.content,
        language: about.language,
      });
    } else {
      setFormData({
        module: "",
        content: "",
        language: "",
      });
    }
  }, [about]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof AboutFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      module: "",
      content: "",
      language: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="2xl"
      onClose={handleClose}
      isDismissable={false}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{about ? "编辑关于我们" : "新增关于我们"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="module"
                >
                  模块 *
                </label>
                <Input
                  required
                  placeholder="请输入模块"
                  value={formData.module}
                  onChange={(e) => handleInputChange("module", e.target.value)}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="content"
                >
                  内容 *
                </label>
                <Textarea
                  required
                  placeholder="请输入内容"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="language"
                >
                  语言 *
                </label>
                <Select
                  placeholder="请选择语言"
                  selectedKeys={formData.language ? [formData.language] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    handleInputChange("language", selectedKey || "");
                  }}
                >
                  {[
                    { key: "en", label: "English" },
                    { key: "zh-CN", label: "中文" },
                  ].map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              取消
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              {about ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

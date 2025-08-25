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
import { Switch } from "@heroui/switch";
import { Tag, TagFormData } from "../../types/tag";

interface TagFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TagFormData) => void;
  tag?: Tag | null;
  isLoading?: boolean;
}

export default function TagForm({
  isOpen,
  onClose,
  onSubmit,
  tag,
  isLoading = false,
}: TagFormProps) {
  const [formData, setFormData] = useState<TagFormData>({
    name: "",
    nameEn: "",
    nameZh: "",
    isActive: true,
  });

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name,
        nameEn: tag.nameEn,
        nameZh: tag.nameZh,
        isActive: tag.isActive,
      });
    } else {
      setFormData({
        name: "",
        nameEn: "",
        nameZh: "",
        isActive: true,
      });
    }
  }, [tag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof TagFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{tag ? "编辑标签" : "新增标签"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签名称 *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="请输入标签名称"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  英文名称 *
                </label>
                <Input
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange("nameEn", e.target.value)}
                  placeholder="Enter English name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  中文名称 *
                </label>
                <Input
                  value={formData.nameZh}
                  onChange={(e) => handleInputChange("nameZh", e.target.value)}
                  placeholder="请输入中文名称"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  isSelected={formData.isActive}
                  onValueChange={(value) =>
                    handleInputChange("isActive", value)
                  }
                />
                <span className="text-sm text-gray-700">启用状态</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              取消
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              {tag ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

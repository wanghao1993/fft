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
import { RadioGroup, Radio } from "@heroui/radio";

import { CreateVideoResource } from "@/types/video_resource";
import { getVideoResourceById } from "@/service/module/video_resource";

interface TagFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVideoResource) => void;
  id?: string | null;
  isLoading?: boolean;
}

export default function VideoResourceForm({
  isOpen,
  onClose,
  onSubmit,
  id,
  isLoading = false,
}: TagFormProps) {
  const [formData, setFormData] = useState<CreateVideoResource>({
    category: "video",
    channel: "",
    language: "zh-CN",
  });

  useEffect(() => {
    if (id) {
      getVideoResourceById(id).then((res) => {
        setFormData({
          channel: res.channel,
          category: res.category,
          language: res.language,
        });
      });
    } else {
      setFormData({
        channel: "",
        category: "video",
        language: "zh-CN",
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof CreateVideoResource,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{id ? "编辑" : "新增"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  频道
                </label>
                <Input
                  required
                  placeholder="请输入频道，以@开头，例如@Bankless"
                  value={formData.channel}
                  onChange={(e) => handleInputChange("channel", e.target.value)}
                />
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
                  htmlFor="category"
                >
                  分类
                </label>
                <RadioGroup
                  label="选择分类"
                  value={formData.category}
                  onValueChange={(e: string) =>
                    handleInputChange("category", e)
                  }
                >
                  <Radio value="video">视频</Radio>
                  <Radio value="podcast">博客</Radio>
                </RadioGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              取消
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              {id ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

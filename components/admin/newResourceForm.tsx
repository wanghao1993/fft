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

import { CreateNewsResource, NewsResource } from "@/types/news_resource";
import { getNewsResourceById } from "@/service/module/news_resource";

interface TagFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateNewsResource) => void;
  id?: string | null;
  isLoading?: boolean;
}

export default function NewResourceForm({
  isOpen,
  onClose,
  onSubmit,
  id,
  isLoading = false,
}: TagFormProps) {
  const [formData, setFormData] = useState<CreateNewsResource>({
    name: "",
    description: "",
    url: "",
    category: "hot_news",
    language: "zh-CN",
  });

  useEffect(() => {
    if (id) {
      getNewsResourceById(id).then((res) => {
        setFormData({
          name: res.name,
          description: res.description,
          url: res.url,
          category: res.category,
          language: res.language,
        });
      });
    } else {
      setFormData({
        name: "",
        description: "",
        url: "",
        category: "hot_news",
        language: "zh-CN",
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof CreateNewsResource,
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
                  名称
                </label>
                <Input
                  required
                  placeholder="请输入名称"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="url"
                >
                  订阅地址
                </label>
                <Input
                  required
                  placeholder="请输入URL"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
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
                  <Radio value="quick_news">快讯</Radio>
                  <Radio value="hot_news">新闻</Radio>
                </RadioGroup>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="description"
                >
                  描述
                </label>
                <Input
                  placeholder="请输入描述"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
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

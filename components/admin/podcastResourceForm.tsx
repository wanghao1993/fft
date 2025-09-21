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
import { RadioGroup, Radio } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";

import { CreatePodcastResource } from "@/types/podcast_resource";
import { getPodcastResourceById } from "@/service/module/podcast_resource";
import { podcastPlatform } from "@/constant/podcastPlatform";

interface PodcastResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePodcastResource) => void;
  id?: string | null;
  isLoading?: boolean;
}

export default function PodcastResourceForm({
  isOpen,
  onClose,
  onSubmit,
  id,
  isLoading = false,
}: PodcastResourceFormProps) {
  const [formData, setFormData] = useState<CreatePodcastResource>({
    platform: "",
    title: "",
    url: "",
    language: "zh-CN",
    description: "",
  });

  useEffect(() => {
    if (id) {
      getPodcastResourceById(id).then((res) => {
        setFormData({
          platform: res.platform,
          title: res.title,
          url: res.url,
          language: res.language,
          description: res.description || "",
        });
      });
    } else {
      setFormData({
        platform: "",
        title: "",
        url: "",
        language: "zh-CN",
        description: "",
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof CreatePodcastResource,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal isDismissable={false} isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{id ? "编辑" : "新增"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="platform"
                >
                  平台
                </label>
                <Select
                  name="platform"
                  placeholder="请选择平台"
                  selectedKeys={[formData.platform]}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    handleInputChange("platform", selectedKey || "");
                  }}
                >
                  <>
                    {podcastPlatform.map((platform) => (
                      <SelectItem key={platform.key}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </>
                </Select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="title"
                >
                  标题
                </label>
                <Input
                  required
                  placeholder="请输入播客标题"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
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
                  placeholder="请输入播客链接"
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
                  htmlFor="description"
                >
                  描述
                </label>
                <Textarea
                  minRows={3}
                  placeholder="请输入播客描述（可选）"
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

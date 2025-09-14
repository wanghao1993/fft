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
import { Select, SelectItem } from "@heroui/select";

import { Social, SocialFormData } from "../../types/social";

interface SocialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SocialFormData) => void;
  social?: Social | null;
  isLoading?: boolean;
}

const PLATFORM_OPTIONS = [
  { key: "email", value: "email", label: "邮箱" },
  { key: "twitter", value: "twitter", label: "Twitter/X" },
  { key: "facebook", value: "facebook", label: "Facebook" },
  { key: "instagram", value: "instagram", label: "Instagram" },
  { key: "linkedin", value: "linkedin", label: "LinkedIn" },
  { key: "youtube", value: "youtube", label: "YouTube" },
  { key: "tiktok", value: "tiktok", label: "TikTok" },
  { key: "telegram", label: "Telegram" },
  { key: "discord", label: "Discord" },
  { key: "wechat", value: "wechat", label: "微信" },
  { key: "weibo", value: "weibo", label: "微博" },
  { key: "bilibili", value: "bilibili", label: "B站" },
];

export default function SocialForm({
  isOpen,
  onClose,
  onSubmit,
  social,
  isLoading = false,
}: SocialFormProps) {
  const [formData, setFormData] = useState<SocialFormData>({
    platform: "twitter",
    url: "",
    isActive: true,
  });

  useEffect(() => {
    if (social) {
      setFormData({
        platform: social.platform,
        url: social.url,
        isActive: social.isActive,
      });
    } else {
      setFormData({
        platform: "twitter",
        url: "",
        isActive: true,
      });
    }
  }, [social]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof SocialFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      platform: "twitter",
      url: "",
      isActive: true,
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
          <ModalHeader>{social ? "编辑社交媒体" : "新增社交媒体"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="platform"
                >
                  平台 *
                </label>
                <Select
                  placeholder="请选择社交媒体平台"
                  selectedKeys={formData.platform ? [formData.platform] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    handleInputChange("platform", selectedKey || "");
                  }}
                >
                  {PLATFORM_OPTIONS.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="url"
                >
                  链接地址 *
                </label>
                <Input
                  required
                  placeholder="请输入社交媒体链接"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  请输入完整的 URL 地址，例如：https://twitter.com/username
                </p>
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
            <Button color="danger" variant="light" onPress={handleClose}>
              取消
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              {social ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

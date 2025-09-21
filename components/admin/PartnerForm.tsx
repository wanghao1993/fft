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

import { PartnerFormData, Partner } from "@/types/partners";

interface SocialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PartnerFormData) => void;
  partner?: PartnerFormData | null;
  isLoading?: boolean;
}

export default function PartnerForm({
  isOpen,
  onClose,
  onSubmit,
  partner,
  isLoading = false,
}: SocialFormProps) {
  const [formData, setFormData] = useState<PartnerFormData>({
    name: "",
    image: "",
    url: "",
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name,
        image: partner.image,
        url: partner.url,
      });
    } else {
      setFormData({
        name: "",
        image: "",
        url: "",
      });
    }
  }, [partner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof PartnerFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      name: "",
      image: "",
      url: "",
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
          <ModalHeader>{partner ? "编辑合作伙伴" : "新增合作伙伴"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  名字 *
                </label>
                <Input
                  required
                  placeholder="请输入合作伙伴名字"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">请输入合作伙伴名字</p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="image"
                >
                  图片地址 *
                </label>
                <Input
                  required
                  placeholder="请输入合作伙伴图片地址"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  请输入合作伙伴图片地址
                </p>
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
                  请输入完整的 URL 地址 或者邮箱
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              取消
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              {partner ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

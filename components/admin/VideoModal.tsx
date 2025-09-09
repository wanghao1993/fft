"use client";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";

import { useToast } from "@/components/ui/Toast";
import {
  createVideo,
  getVideoDetail,
  updateVideoById,
} from "@/service/module/videos";

interface VideoModalProps {
  isOpen: boolean;
  id?: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface VideoFormData {
  title: string;
  link: string;
  source: string;
  channel: string;
  category: string;
  language: string;
  time: string;
  thumbnail: string;
  fixTop: boolean;
}

const initialFormData: VideoFormData = {
  title: "",
  link: "",
  source: "",
  channel: "",
  category: "",
  language: "",
  time: "",
  thumbnail: "",
  fixTop: false,
};

export default function VideoModal({
  isOpen,
  onClose,
  id,
  onSuccess,
}: VideoModalProps) {
  const [formData, setFormData] = useState<VideoFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    field: keyof VideoFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (isOpen && id) {
      getVideoDetail(id).then((res) => {
        const {
          title,
          link,
          source,
          channel,
          category,
          language,
          time,
          thumbnail,
          fixTop,
        } = res;

        setFormData({
          title,
          link,
          source,
          channel,
          category,
          language,
          time,
          thumbnail,
          fixTop,
        });
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 验证必填字段

    setIsLoading(true);

    try {
      if (id) {
        await updateVideoById(id, formData);
      } else {
        await createVideo(formData);
      }

      addToast({
        title: "成功",
        description: "视频创建成功",
        color: "success",
      });

      setFormData(initialFormData);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "创建视频失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="3xl"
      onClose={handleClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {id ? "编辑" : "新增"}视频
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Input
                isRequired
                className="w-full"
                label="标题"
                placeholder="请输入视频标题"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("title", e.target.value)
                }
              />

              <Input
                isRequired
                label="链接"
                placeholder="请输入视频链接"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
              />

              <Input
                isRequired
                label="来源"
                placeholder="请输入视频来源"
                value={formData.source}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("source", e.target.value)
                }
              />

              <Input
                isRequired
                label="频道"
                placeholder="请输入频道名称"
                value={formData.channel}
                onChange={(e) => handleInputChange("channel", e.target.value)}
              />

              <Select
                isRequired
                label="分类"
                placeholder="请选择分类"
                selectedKeys={formData.category ? [formData.category] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;

                  handleInputChange("category", selectedKey || "");
                }}
              >
                <SelectItem key="video">视频</SelectItem>
                <SelectItem key="podcast">播客</SelectItem>
              </Select>

              <Select
                isRequired
                label="语言"
                placeholder="请选择语言"
                selectedKeys={formData.language ? [formData.language] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;

                  handleInputChange("language", selectedKey || "");
                }}
              >
                <SelectItem key="en">English</SelectItem>
                <SelectItem key="zh-CN">中文</SelectItem>
              </Select>

              <Input
                isRequired
                label="时长"
                placeholder="请输入视频时长 (如: 10:30)"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />

              <Input
                isRequired
                label="缩略图"
                placeholder="请输入缩略图URL"
                value={formData.thumbnail}
                onChange={(e) => handleInputChange("thumbnail", e.target.value)}
              />

              <Switch
                checked={formData.fixTop}
                size="sm"
                onValueChange={(value) => handleInputChange("fixTop", value)}
              >
                <span className="text-sm text-gray-700">置顶</span>
              </Switch>
            </div>
            <div className="flex justify-end gap-4 w-full border-t pt-4">
              <Button color="danger" variant="light" onPress={handleClose}>
                取消
              </Button>
              <Button color="primary" isLoading={isLoading} type="submit">
                创建
              </Button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

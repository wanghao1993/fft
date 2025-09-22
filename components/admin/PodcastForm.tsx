"use client";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Spinner } from "@heroui/spinner";

import { useToast } from "@/components/ui/Toast";
import {
  createPodcast,
  getPodcastById,
  updatePodcast,
} from "@/service/module/podcast";
import { CreatePodcast } from "@/types/podcast";
import { podcastPlatform } from "@/constant/podcastPlatform";

interface PodcastFormProps {
  isOpen: boolean;
  id?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const initialFormData: CreatePodcast = {
  platform: "",
  title: "",
  enclosure: "",
  language: "",
  description: "",
};

export default function PodcastForm({
  isOpen,
  onClose,
  id,
  onSuccess,
}: PodcastFormProps) {
  const [formData, setFormData] = useState<CreatePodcast>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CreatePodcast, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen && id) {
      setIsFetching(true);
      getPodcastById(id)
        .then((res) => {
          const { platform, title, enclosure, language, description } = res;

          setFormData({
            platform,
            title,
            enclosure,
            language,
            description: description || "",
          });
        })
        .catch((error) => {
          toast.error({
            title: "错误",
            description: "获取播客详情失败",
          });
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 验证必填字段
    if (
      !formData.platform ||
      !formData.title ||
      !formData.enclosure ||
      !formData.language
    ) {
      toast.error({
        title: "错误",
        description: "请填写所有必填字段",
      });

      return;
    }

    setIsLoading(true);

    console.log(formData, "formData");
    try {
      const submitData: CreatePodcast = {
        platform: formData.platform,
        title: formData.title,
        enclosure: formData.enclosure,
        language: formData.language,
        description: formData.description || undefined,
      };

      if (id) {
        await updatePodcast(id, submitData);
        addToast({
          title: "成功",
          description: "播客更新成功",
          color: "success",
        });
      } else {
        await createPodcast(submitData);
        addToast({
          title: "成功",
          description: "播客创建成功",
          color: "success",
        });
      }

      setFormData(initialFormData);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || (id ? "更新播客失败" : "创建播客失败"),
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
          {id ? "编辑" : "新增"}播客
        </ModalHeader>
        {isFetching ? (
          <ModalBody>
            <div className="flex justify-center items-center py-8">
              <Spinner />
            </div>
          </ModalBody>
        ) : (
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Select
                  isRequired
                  label="平台"
                  placeholder="请选择平台"
                  selectedKeys={formData.platform ? [formData.platform] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;

                    handleInputChange("platform", selectedKey || "");
                  }}
                >
                  {podcastPlatform.map((platform) => (
                    <SelectItem key={platform.key}>{platform.name}</SelectItem>
                  ))}
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
                  className="w-full"
                  label="标题"
                  placeholder="请输入播客标题"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("title", e.target.value)
                  }
                />

                <Input
                  isRequired
                  className="w-full"
                  label="音频"
                  placeholder="请输入播客音频"
                  value={formData.enclosure}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("enclosure", e.target.value)
                  }
                />
              </div>

              <Textarea
                className="w-full"
                label="描述"
                placeholder="请输入播客描述（可选）"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />

              <div className="flex justify-end gap-4 w-full border-t pt-4">
                <Button color="danger" variant="light" onPress={handleClose}>
                  取消
                </Button>
                <Button color="primary" isLoading={isLoading} type="submit">
                  {id ? "更新" : "创建"}
                </Button>
              </div>
            </Form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}

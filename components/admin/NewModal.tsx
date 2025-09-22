"use client";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { addToast } from "@heroui/toast";
import { Form } from "@heroui/form";
import { Spinner } from "@heroui/spinner";

import { useToast } from "@/components/ui/Toast";
import {
  createNews,
  getNewsById,
  updateNewsById,
} from "@/service/module/quick_news";
import { getTags } from "@/service/module/tag";
import { Tag } from "@/types/tag";

interface NewsModalProps {
  isOpen: boolean;
  id?: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface NewsFormData {
  title: string;
  link: string;
  source: string;
  category: string;
  language: string;
  fixTop: boolean;
  summary: string;
  tags: string[];
  fixTopExpiryAt?: string;
}

const initialFormData: NewsFormData = {
  title: "",
  link: typeof window !== "undefined" ? location.origin : "",
  source: "Future Frontier",
  category: "",
  tags: [],
  language: "",
  fixTop: false,
  summary: "",
};

export default function NewsModal({
  isOpen,
  onClose,
  id,
  onSuccess,
}: NewsModalProps) {
  const [formData, setFormData] = useState<NewsFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    field: keyof NewsFormData,
    value: string | boolean | string[] | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [tagList, setTagList] = useState<Tag[]>([]);
  const getTagListFn = async () => {
    const response = await getTags();

    setTagList(response);
  };

  useEffect(() => {
    getTagListFn();
  }, []);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen && id) {
      setIsFetching(true);
      getNewsById(id)
        .then((res) => {
          const {
            title,
            link,
            source,
            category,
            language,
            fixTop,
            summary,
            tags,
            fixTopExpiryAt,
          } = res;

          setFormData({
            title,
            link,
            source,
            category,
            language,
            fixTop,
            summary,
            tags: tags.map((tag) => tag.id),
            fixTopExpiryAt,
          });
        })
        .finally(() => {
          setIsFetching(false);
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
        await updateNewsById(id, {
          ...formData,
          tags: formData.tags.join(","),
        });
      } else {
        await createNews({
          ...formData,
          tags: formData.tags.join(","),
        });
      }

      addToast({
        title: "成功",
        description: "新闻创建成功",
        color: "success",
      });

      setFormData(initialFormData);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: error.message || "创建新闻失败",
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
          {id ? "编辑" : "新增"}新闻
        </ModalHeader>
        {isFetching ? (
          <ModalBody>
            <Spinner />
          </ModalBody>
        ) : (
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Input
                  isRequired
                  className="w-full"
                  label="标题"
                  placeholder="请输入新闻标题"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("title", e.target.value)
                  }
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
                  <SelectItem key="quick_news">快讯</SelectItem>
                  <SelectItem key="hot_news">热点新闻</SelectItem>
                </Select>

                <Select
                  isRequired
                  label="标签"
                  placeholder="请选择标签"
                  selectedKeys={formData.tags ? formData.tags : []}
                  selectionMode="multiple"
                  value={formData.tags}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys) as string[];

                    handleInputChange("tags", selectedKey || ([] as string[]));
                  }}
                >
                  {tagList.map((tag) => (
                    <SelectItem key={tag.id}>{tag.name}</SelectItem>
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
                  className="w-full"
                  label="来源"
                  placeholder="请输入新闻来源，不填默认为Future Frontier"
                  value={formData.source}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("source", e.target.value)
                  }
                />

                <Input
                  isRequired
                  className="w-full"
                  label="链接"
                  placeholder="请输入新闻链接"
                  value={formData.link}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("link", e.target.value)
                  }
                />

                <Switch
                  isSelected={formData.fixTop}
                  size="sm"
                  onValueChange={(value) => {
                    handleInputChange("fixTop", value);
                    handleInputChange("fixTopExpiryAt", null);
                  }}
                >
                  <span className="text-sm text-gray-700">置顶</span>
                </Switch>
                {formData.fixTop && (
                  <Input
                    isRequired
                    className="w-full"
                    label="置顶到期时间"
                    placeholder="请输入置顶到期时间，格式2025-09-22 12:34"
                    value={formData.fixTopExpiryAt || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("fixTopExpiryAt", e.target.value)
                    }
                  />
                )}
              </div>
              <Textarea
                isRequired
                label="总结"
                placeholder="请输入新闻总结"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
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

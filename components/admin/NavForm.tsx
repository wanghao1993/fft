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

import { Nav, NavFormData } from "../../types/nav";

interface NavFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NavFormData) => void;
  nav?: Nav | null;
  parentNavs?: Nav[];
  isLoading?: boolean;
}

export default function NavForm({
  isOpen,
  onClose,
  onSubmit,
  nav,
  parentNavs = [],
  isLoading = false,
}: NavFormProps) {
  const [formData, setFormData] = useState<NavFormData>({
    nameZh: "",
    nameEn: "",
    isVisible: true,
    sortOrder: 0,
    url: "",
    icon: "",
    parentId: "",
  });

  useEffect(() => {
    if (nav) {
      setFormData({
        nameZh: nav.nameZh,
        nameEn: nav.nameEn,
        isVisible: nav.isVisible,
        sortOrder: nav.sortOrder,
        url: nav.url || "",
        icon: nav.icon || "",
        parentId: nav.parentId || "",
      });
    } else {
      setFormData({
        nameZh: "",
        nameEn: "",
        isVisible: true,
        sortOrder: 0,
        url: "",
        icon: "",
        parentId: "",
      });
    }
  }, [nav]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof NavFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      nameZh: "",
      nameEn: "",
      isVisible: true,
      sortOrder: 0,
      url: "",
      icon: "",
      parentId: "",
    });
    onClose();
  };

  // 过滤掉当前编辑的菜单项，避免循环引用
  const availableParentNavs = parentNavs.filter(
    (parent) => parent.id !== nav?.id
  );

  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      size="2xl"
      onClose={handleClose}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{nav ? "编辑菜单" : "新增菜单"}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="nameZh"
                  >
                    中文名称 *
                  </label>
                  <Input
                    required
                    name="nameZh"
                    placeholder="请输入中文名称"
                    value={formData.nameZh}
                    onChange={(e) =>
                      handleInputChange("nameZh", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="nameEn"
                  >
                    英文名称 *
                  </label>
                  <Input
                    required
                    name="nameEn"
                    placeholder="请输入英文名称"
                    value={formData.nameEn}
                    onChange={(e) =>
                      handleInputChange("nameEn", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="url"
                  >
                    链接地址
                  </label>
                  <Input
                    name="url"
                    placeholder="请输入链接地址，如：/home"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                  />
                </div>

                {/* <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="icon"
                  >
                    图标
                  </label>
                  <Input
                    placeholder="请输入图标名称，如：home"
                    value={formData.icon}
                    onChange={(e) => handleInputChange("icon", e.target.value)}
                  />
                </div> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="parentId"
                  >
                    父级菜单
                  </label>
                  <Select
                    name="parentId"
                    placeholder="请选择父级菜单（可选）"
                    selectedKeys={formData.parentId}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;

                      handleInputChange("parentId", selectedKey || "");
                    }}
                  >
                    <SelectItem key="">无（顶级菜单）</SelectItem>
                    <>
                      {availableParentNavs.map((parent) => (
                        <SelectItem key={parent.id}>
                          {parent.nameZh} ({parent.nameEn})
                        </SelectItem>
                      ))}
                    </>
                  </Select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="sortOrder"
                  >
                    排序 *
                  </label>
                  <Input
                    placeholder="请输入排序数字"
                    type="number"
                    value={formData.sortOrder.toString()}
                    onChange={(e) =>
                      handleInputChange(
                        "sortOrder",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="flex items-center space-x-2"
                  htmlFor="isVisible"
                >
                  <Switch
                    isSelected={formData.isVisible}
                    name="isVisible"
                    onValueChange={(checked) =>
                      handleInputChange("isVisible", checked)
                    }
                  />
                  <span className="text-sm font-medium text-gray-700">
                    是否显示
                  </span>
                </label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              取消
            </Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              {nav ? "更新" : "创建"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { Tooltip } from "@heroui/tooltip";
import { Spinner } from "@heroui/spinner";
import { Edit, Trash2, Plus, ExternalLink } from "lucide-react";
import dayjs from "dayjs";

import { Social } from "../../types/social";

import { socialIcons } from "@/config/socialIcons";

interface SocialTableProps {
  socials: Social[];
  isLoading: boolean;
  onEdit: (social: Social) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onAdd: () => void;
}

export default function SocialTable({
  socials,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
  onAdd,
}: SocialTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      onToggleStatus(id, isActive);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除这个社交媒体链接吗？")) {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      try {
        await onDelete(id);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">社交媒体管理</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={onAdd}
        >
          新增社交媒体
        </Button>
      </div>

      <Table aria-label="社交媒体列表">
        <TableHeader>
          <TableColumn>平台</TableColumn>
          <TableColumn>图标</TableColumn>
          <TableColumn>链接</TableColumn>
          <TableColumn>状态</TableColumn>
          <TableColumn>创建时间</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {socials.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={6}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            socials.map((social) => (
              <TableRow key={social.id}>
                <TableCell>
                  <span className="font-medium">{social.platform}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {socialIcons[social.platform]}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {social.url}
                    </span>
                    <Tooltip content="打开链接">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => window.open(social.url, "_blank")}
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    isDisabled={loadingStates[social.id]}
                    isSelected={social.isActive}
                    size="sm"
                    onValueChange={(value) =>
                      handleToggleStatus(social.id, value)
                    }
                  />
                </TableCell>
                <TableCell>
                  {dayjs(social.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(social)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="删除">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(social.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

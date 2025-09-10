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
import { Edit, Trash2, Plus } from "lucide-react";
import dayjs from "dayjs";

import { Tag } from "../../types/tag";

interface TagTableProps {
  tags: Tag[];
  isLoading: boolean;
  onEdit: (tag: Tag) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onAdd: () => void;
}

export default function TagTable({
  tags,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
  onAdd,
}: TagTableProps) {
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
    if (confirm("确定要删除这个标签吗？")) {
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
        <h2 className="text-xl font-semibold">标签管理</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={onAdd}
        >
          新增标签
        </Button>
      </div>

      <Table aria-label="标签列表">
        <TableHeader>
          <TableColumn>标签名称</TableColumn>
          <TableColumn>状态</TableColumn>
          <TableColumn>创建时间</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {tags.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={6}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>
                  <span className="font-medium">{tag.name}</span>
                </TableCell>
                <TableCell>
                  <Switch
                    isDisabled={loadingStates[tag.id]}
                    isSelected={tag.isActive}
                    size="sm"
                    onValueChange={(value) => handleToggleStatus(tag.id, value)}
                  />
                </TableCell>
                <TableCell>
                  {dayjs(tag.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(tag)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="删除">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(tag.id)}
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

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
import { Tooltip } from "@heroui/tooltip";
import { Spinner } from "@heroui/spinner";
import { Edit, Trash2, Plus } from "lucide-react";

import { About } from "../../types/about";

interface AboutTableProps {
  abouts: About[];
  isLoading: boolean;
  onEdit: (about: About) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function AboutTable({
  abouts,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: AboutTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleDelete = async (id: string, sequence: number) => {
    if (confirm("确定要删除这个社交媒体链接吗？")) {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      try {
        await onDelete(id, sequence);
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
        <h2 className="text-xl font-semibold">关于我们管理</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={onAdd}
        >
          新增关于我们
        </Button>
      </div>

      <Table aria-label="关于我们列表">
        <TableHeader>
          <TableColumn>模块</TableColumn>
          <TableColumn>序列</TableColumn>
          <TableColumn>内容</TableColumn>
          <TableColumn>语言</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {abouts.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={5}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            abouts.map((about) => (
              <TableRow key={about.id}>
                <TableCell>
                  <span className="font-medium">{about.module}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{about.sequence}</span>
                </TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: about.content }} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {about.language}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(about)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="删除">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(about.id, about.sequence)}
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

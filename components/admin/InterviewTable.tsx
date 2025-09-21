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
import { Edit, Trash2, Plus, ExternalLink } from "lucide-react";
import dayjs from "dayjs";

import { Interview } from "../../types/interview";

interface InterviewTableProps {
  interviews: Interview[];
  isLoading: boolean;
  onEdit: (interview: Interview) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function InterviewTable({
  interviews,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: InterviewTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除这个访谈吗？")) {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      try {
        onDelete(id);
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
        <h2 className="text-xl font-semibold">访谈管理</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={onAdd}
        >
          新增访谈
        </Button>
      </div>

      <Table aria-label="访谈列表">
        <TableHeader>
          <TableColumn>标题</TableColumn>
          <TableColumn>语言</TableColumn>
          <TableColumn>封面</TableColumn>
          <TableColumn>链接</TableColumn>
          <TableColumn>创建时间</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {interviews.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={6}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            interviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>
                  <div className="max-w-[200px]">
                    <span className="font-medium line-clamp-2">
                      {interview.title}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 truncate max-w-[150px]">
                      {interview.language === "zh-CN" ? "中文" : "英文"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[100px]">
                    {interview.cover && (
                      <img
                        src={interview.cover}
                        alt={interview.title}
                        className="w-16 h-12 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.jpg";
                        }}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 truncate max-w-[150px]">
                      {interview.url}
                    </span>
                    <Tooltip content="打开链接">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => window.open(interview.url, "_blank")}
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>

                <TableCell>
                  {dayjs(interview.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(interview)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="删除">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(interview.id)}
                        isLoading={loadingStates[interview.id]}
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

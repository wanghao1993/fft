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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import { Spinner } from "@heroui/spinner";
import { Edit, MoreVertical, Trash2, Plus } from "lucide-react";
import dayjs from "dayjs";

import { Article } from "@/types/blog";
import { Link } from "@/i18n/navigation";

interface ArticleTableProps {
  articles: Article[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onAdd: () => void;
}

export default function ArticleTable({
  articles = [],
  isLoading,
  onDelete,
  onToggleStatus,
  onAdd,
}: ArticleTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await onToggleStatus(id, isActive);
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
        <h2 className="text-xl font-semibold">文章管理</h2>
        <Link href={"write"}>新增文章</Link>
      </div>

      <Table aria-label="标签列表">
        <TableHeader>
          <TableColumn>标题</TableColumn>
          <TableColumn>创建时间</TableColumn>
          <TableColumn>更新时间</TableColumn>
          <TableColumn>阅读量</TableColumn>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={6}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Link href={`write?id=${article.id}`}>
                    <span className="font-medium">{article.title}</span>
                  </Link>
                </TableCell>

                <TableCell>
                  {dayjs(article.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  {dayjs(article.updatedAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>{article.viewCount}</TableCell>
                {/* <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(article)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          key="delete"
                          color="danger"
                          startContent={<Trash2 size={16} />}
                          onPress={() => handleDelete(article.id)}
                        >
                          删除
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

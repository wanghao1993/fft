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

import { Partner } from "../../types/partners";

interface PartnerTableProps {
  partners: Partner[];
  isLoading: boolean;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function PartnerTable({
  partners,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
}: PartnerTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除这个社交媒体链接吗？")) {
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
        <h2 className="text-xl font-semibold">合作伙伴</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={onAdd}
        >
          新增合作伙伴
        </Button>
      </div>

      <Table aria-label="社交媒体列表">
        <TableHeader>
          <TableColumn>名称</TableColumn>
          <TableColumn>图标</TableColumn>
          <TableColumn>链接</TableColumn>
          <TableColumn>创建时间</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {partners.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={5}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <span className="font-medium">{partner.name}</span>
                </TableCell>
                <TableCell>{partner.image}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {partner.url}
                    </span>
                    <Tooltip content="打开链接">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => window.open(partner.url, "_blank")}
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>

                <TableCell>
                  {dayjs(partner.createdAt).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(partner)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="删除">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(partner.id)}
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

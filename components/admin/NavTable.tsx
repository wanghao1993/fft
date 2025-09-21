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
import { Switch } from "@heroui/switch";
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

import { Nav } from "../../types/nav";

interface NavTableProps {
  navs: Nav[];
  isLoading: boolean;
  onEdit: (nav: Nav) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onToggleVisibility: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function NavTable({
  navs,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
}: NavTableProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleDelete = async (id: string) => {
    if (confirm("确定要删除这个菜单项吗？")) {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      try {
        onDelete(id);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      onToggleVisibility(id);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleMoveUp = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      onMoveUp(id);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleMoveDown = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await onMoveDown(id);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  // 按层级和排序顺序组织菜单
  const sortedNavs = (() => {
    const result: Nav[] = [];
    const processed = new Set<string>();

    // 递归函数来添加菜单项及其子项
    const addNavWithChildren = (nav: Nav) => {
      if (processed.has(nav.id)) return;

      // 添加当前菜单项
      result.push(nav);
      processed.add(nav.id);

      // 找到并添加所有子菜单
      const children = navs
        .filter((n) => n.parentId === nav.id)
        .sort((a, b) => a.sortOrder - b.sortOrder);

      children.forEach((child) => addNavWithChildren(child));
    };

    // 先添加所有顶级菜单（没有 parentId 的菜单）
    const topLevelNavs = navs
      .filter((nav) => !nav.parentId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    topLevelNavs.forEach((nav) => addNavWithChildren(nav));

    return result;
  })();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">菜单管理</h2>
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onPress={onAdd}
        >
          新增菜单
        </Button>
      </div>

      <Table aria-label="菜单列表">
        <TableHeader>
          <TableColumn>中文名称</TableColumn>
          <TableColumn>英文名称</TableColumn>
          <TableColumn>链接地址</TableColumn>
          <TableColumn>排序</TableColumn>
          <TableColumn>显示状态</TableColumn>
          <TableColumn>操作</TableColumn>
        </TableHeader>
        <TableBody>
          {sortedNavs.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-gray-500 py-8" colSpan={6}>
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            sortedNavs.map((nav, index) => (
              <TableRow key={nav.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {nav.parentId && (
                      <span className="text-gray-400 ml-4">└─</span>
                    )}
                    <span className="font-medium">{nav.nameZh}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{nav.nameEn}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {nav.url || "-"}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="font-medium">{nav.sortOrder}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      isDisabled={loadingStates[nav.id]}
                      isSelected={nav.isVisible}
                      size="sm"
                      onValueChange={() => handleToggleVisibility(nav.id)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Tooltip content="上移">
                      <Button
                        isIconOnly
                        isDisabled={loadingStates[nav.id] || index === 0}
                        size="sm"
                        variant="light"
                        onPress={() => handleMoveUp(nav.id)}
                      >
                        <ArrowUp size={14} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="下移">
                      <Button
                        isIconOnly
                        isDisabled={
                          loadingStates[nav.id] ||
                          index === sortedNavs.length - 1
                        }
                        size="sm"
                        variant="light"
                        onPress={() => handleMoveDown(nav.id)}
                      >
                        <ArrowDown size={14} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="编辑">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(nav)}
                      >
                        <Edit size={16} />
                      </Button>
                    </Tooltip>

                    <Tooltip content="删除">
                      <Button
                        isIconOnly
                        color="danger"
                        isDisabled={loadingStates[nav.id]}
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(nav.id)}
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

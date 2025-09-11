"use client";
import { useState, useEffect, useCallback } from "react";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import dayjs from "dayjs";

import { useToast } from "@/components/ui/Toast";
import { Toast } from "@/components/ui/Toast";
import AuthWrapper from "@/components/admin/AuthWrapper";
import {
  deleteVideoResource,
  createVideoResource,
  getVideoResource,
  updateVideoResource,
} from "@/service/module/video_resource";
import { CreateVideoResource, VideoResource } from "@/types/video_resource";
import VideoResourceForm from "@/components/admin/videoResourceForm";
import { Link } from "@/i18n/navigation";

export default function AdminNewsPage() {
  const [news, setNews] = useState<VideoResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast, toasts } = useToast();

  const columns = [
    {
      key: "channel",
      label: "名称",
      with: 100,
    },
    {
      key: "category",
      label: "分类",
      with: 100,
    },
    {
      key: "language",
      label: "语言",
      with: 100,
    },
    {
      key: "url",
      label: "地址",
      with: 200,
    },

    {
      key: "createdAt",
      label: "创建时间",
      with: 150,
    },

    {
      key: "updatedAt",
      label: "更新时间",
      with: 150,
    },
    {
      key: "action",
      label: "操作",
      with: 230,
    },
  ];

  const [id, setId] = useState<string | null>(null);
  const renderCell = useCallback(
    (item: VideoResource, columnKey: string | number) => {
      if (columnKey === "category") {
        return item.category === "video" ? "视频" : "播客";
      } else if (columnKey === "url") {
        return (
          <Link
            className="text-primary"
            href={`https://www.youtube.com/${item.channel}`}
            target="_blank"
          >
            {item.channel}
          </Link>
        );
      } else if (columnKey === "createdAt") {
        return dayjs(item.createdAt).format("YYYY-MM-DD HH:mm");
      } else if (columnKey === "updatedAt") {
        return dayjs(item.updatedAt).format("YYYY-MM-DD HH:mm");
      } else if (columnKey === "action") {
        return (
          <div className="space-x-2">
            <Button color="primary" size="sm" onPress={() => onEdit(item.id)}>
              编辑
            </Button>
            <Button color="danger" size="sm" onPress={() => onDelete(item.id)}>
              删除
            </Button>
          </div>
        );
      }

      return getKeyValue(item, columnKey);
    },
    []
  );

  const getList = async () => {
    setIsLoading(true);
    try {
      const response = await getVideoResource();

      setNews(response);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: "加载列表失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  const onDelete = async (id: string) => {
    if (confirm("确定删除吗？")) {
      await deleteVideoResource(id);
      getList();
      toast.success({
        title: "成功",
        description: "删除成功",
      });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = (data: CreateVideoResource) => {
    setIsLoading(true);
    if (id) {
      updateVideoResource(id, data).then(() => {
        getList();
        setIsLoading(false);
        setIsOpen(false);
        setId(null);
        toast.success({
          title: "成功",
          description: "更新成功",
        });
      });
    } else {
      createVideoResource(data)
        .then(() => {
          getList();
          setIsLoading(false);
          setIsOpen(false);
          setId(null);
          toast.success({
            title: "成功",
            description: "新增成功",
          });
        })
        .catch(() => {
          setIsLoading(false);
          toast.error({
            title: "错误",
            description: "新增失败",
          });
        });
    }
  };

  return (
    <AuthWrapper>
      <h2 className="font-bold text-2xl mb-4 flex justify-between">
        <span className="mr-4">视频来源管理</span>
        <Button
          className="mb-4 text-xs"
          color="primary"
          size="sm"
          startContent={<PlusIcon size={14} />}
          onPress={() => setIsOpen(true)}
        >
          新增
        </Button>
      </h2>

      <Table
        isHeaderSticky
        isStriped
        aria-label="Example table with dynamic content"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} width={column.with}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="暂无数据"
          items={news || []}
          loadingContent={<Spinner color="primary" size="lg" />}
          loadingState={isLoading ? "loading" : undefined}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Toast 通知 */}
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} {...toastItem} />
      ))}

      <VideoResourceForm
        id={id}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </AuthWrapper>
  );
}

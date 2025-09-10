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
import dayjs from "dayjs";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { Edit2, Trash2 } from "lucide-react";

import { useToast } from "@/components/ui/Toast";
import { Toast } from "@/components/ui/Toast";
import Pagination from "@/components/admin/Pagination";
import AuthWrapper from "@/components/admin/AuthWrapper";
import VideoModal from "@/components/admin/VideoModal";
import {
  deleteVideo,
  getVideos,
  updateVideoById,
} from "@/service/module/videos";
import { Video, VideoResponse } from "@/types/videos";
import { Link } from "@/i18n/navigation";

export default function AdminVideoPage() {
  const [videos, setVideos] = useState<VideoResponse["data"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast, toasts } = useToast();
  const [pagi, setPagi] = useState<VideoResponse["meta"]>();
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      key: "title",
      label: "标题",
      with: 300,
    },
    {
      key: "fix_top",
      label: "置顶",
      width: 100,
    },
    {
      key: "source",
      label: "来源",
      with: 100,
    },
    {
      key: "channel",
      label: "频道",
      with: 200,
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
      key: "time",
      label: "时长",
      with: 60,
    },
    {
      key: "publishedAt",
      label: "发布时间",
      with: 150,
    },
    {
      key: "action",
      label: "操作",
      with: 100,
    },
  ];

  const [id, setId] = useState("");
  const renderCell = useCallback((item: Video, columnKey: string | number) => {
    if (columnKey === "publishedAt") {
      return dayjs(item.publishedAt).format("YYYY-MM-DD HH:mm");
    } else if (columnKey === "fix_top") {
      return (
        <Switch
          defaultSelected={item.fixTop}
          size="sm"
          onValueChange={(value) => onFixTop(item.uuid, value)}
        />
      );
    } else if (columnKey === "action") {
      return (
        <div className="flex gap-4">
          <Edit2
            className="cursor-pointer"
            size={14}
            onClick={() => {
              setId(item.uuid);
              setIsModalOpen(true);
            }}
          />
          <Trash2
            className="cursor-pointer"
            color="red"
            size={14}
            onClick={() => {
              if (confirm(`确定删除[${item.title}]吗？`)) {
                onDelete(item.uuid);
              }
            }}
          />
        </div>
      );
    } else if (columnKey === "title") {
      return (
        <Link className="underline" href={item.link} target="_blank">
          {item.title}
        </Link>
      );
    }

    return getKeyValue(item, columnKey);
  }, []);

  const getList = async () => {
    setIsLoading(true);
    try {
      const response = await getVideos({
        limit: 20,
        page: currentPage,
        ...formData,
      });

      setPagi(response.meta);

      setVideos(response.data);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: "加载视频列表失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  const onDelete = async (id: string) => {
    await deleteVideo(id);
    getList();
  };

  const onFixTop = async (id: string, value: boolean) => {
    await updateVideoById(id, {
      fixTop: value,
    });
    getList();
  };

  useEffect(() => {
    getList();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    language: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    getList();
  };

  const handleModalSuccess = () => {
    getList();
  };

  return (
    <AuthWrapper>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">视频管理</h2>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          isClearable={true}
          label="标题"
          labelPlacement="inside"
          name="title"
          placeholder="请输入标题"
          type="text"
          value={formData.title}
          onChange={(e) => {
            setFormData({
              ...formData,
              title: e.target.value,
            });
          }}
        />

        <Select
          isClearable={true}
          label="语言"
          labelPlacement="inside"
          name="language"
          placeholder="请输入语言"
          value={formData.language}
          onSelectionChange={(e) => {
            setFormData({
              ...formData,
              language: e.currentKey,
            } as any);
          }}
        >
          <SelectItem key="en">English</SelectItem>
          <SelectItem key="zh-CN">中文</SelectItem>
        </Select>

        <Select
          isClearable={true}
          label="分类"
          labelPlacement="inside"
          name="category"
          placeholder="请输入分类"
          value={formData.category}
          onSelectionChange={(e) => {
            setFormData({
              ...formData,
              category: e.currentKey,
            } as any);
          }}
        >
          <SelectItem key="video">视频</SelectItem>
          <SelectItem key="podcast">播客</SelectItem>
        </Select>

        <Button onPress={handleSearch}>搜索</Button>
        <Button color="primary" onPress={() => setIsModalOpen(true)}>
          新增视频
        </Button>
      </div>
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
          items={videos || []}
          loadingContent={<Spinner color="primary" size="lg" />}
          loadingState={isLoading ? "loading" : undefined}
        >
          {(item) => (
            <TableRow key={item.uuid}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        currentPage={pagi?.page || 1}
        hasNext={pagi?.hasNext || false}
        hasPrev={pagi?.hasPrev || false}
        total={pagi?.total || 20}
        totalPages={pagi?.totalPages || 0}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      {/* Toast 通知 */}
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} {...toastItem} />
      ))}

      {/* 新增视频Modal */}
      <VideoModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setId("");
        }}
        onSuccess={handleModalSuccess}
      />
    </AuthWrapper>
  );
}

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
import { Chip } from "@heroui/chip";

import { useToast } from "@/components/ui/Toast";
import { Toast } from "@/components/ui/Toast";
import Pagination from "@/components/admin/Pagination";
import AuthWrapper from "@/components/admin/AuthWrapper";
import { deletePodcast, getPodcast } from "@/service/module/podcast";
import { Podcast } from "@/types/podcast";
import { podcastPlatform } from "@/constant/podcastPlatform";
import PodcastForm from "./PodcastForm";

export default function PodcastTable() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast, toasts } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const columns = [
    {
      key: "platform",
      label: "平台",
      width: 120,
    },
    {
      key: "title",
      label: "标题",
      width: 300,
    },
    {
      key: "enclosure",
      label: "音频",
      width: 200,
    },
    {
      key: "language",
      label: "语言",
      width: 100,
    },

    {
      key: "description",
      label: "描述",
      width: 200,
    },
    {
      key: "createdAt",
      label: "创建时间",
      width: 150,
    },
    {
      key: "action",
      label: "操作",
      width: 150,
    },
  ];

  const [id, setId] = useState<string>("");
  const onEdit = async (id: string) => {
    setId(id);
    setIsModalOpen(true);
  };

  const renderCell = useCallback(
    (item: Podcast, columnKey: string | number) => {
      if (columnKey === "createdAt") {
        return dayjs(item.createdAt).format("YYYY-MM-DD HH:mm");
      } else if (columnKey === "action") {
        return (
          <div className="flex gap-2">
            <Button color="primary" size="sm" onPress={() => onEdit(item.id)}>
              编辑
            </Button>
            <Button color="danger" size="sm" onPress={() => onDelete(item.id)}>
              删除
            </Button>
          </div>
        );
      } else if (columnKey === "title") {
        return (
          <div className="max-w-[280px] truncate" title={item.title}>
            {item.title}
          </div>
        );
      } else if (columnKey === "enclosure") {
        return (
          <audio controls src={item.enclosure}>
            <track kind="captions" />
          </audio>
        );
      } else if (columnKey === "description") {
        return (
          <div className="max-w-[180px] truncate" title={item.description}>
            {item.description || "-"}
          </div>
        );
      } else if (columnKey === "language") {
        return (
          <Chip
            color={item.language === "zh-CN" ? "primary" : "secondary"}
            size="sm"
            variant="flat"
          >
            {item.language === "zh-CN" ? "中文" : "English"}
          </Chip>
        );
      } else if (columnKey === "platform") {
        return (
          <Chip color="default" size="sm" variant="flat">
            {item.platform}
          </Chip>
        );
      }

      return getKeyValue(item, columnKey);
    },
    []
  );

  const getList = async () => {
    setIsLoading(true);
    try {
      const response = await getPodcast({
        page: currentPage,
        limit: 20,
        keyword: formData.keyword,
        platform: formData.platform,
        language: formData.language,
      });

      setPodcasts(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch {
      toast.error({
        title: "错误",
        description: "加载播客列表失败",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  const onDelete = async (id: string) => {
    if (confirm(`确定删除这个播客吗？`)) {
      try {
        await deletePodcast(id);
        getList();
        toast.success({
          title: "成功",
          description: "删除成功",
        });
      } catch {
        toast.error({
          title: "错误",
          description: "删除失败",
        });
      }
    }
  };

  const [formData, setFormData] = useState({
    keyword: "",
    platform: "",
    language: "",
  });

  const handleSearch = () => {
    setCurrentPage(1);
    getList();
  };

  const handleModalSuccess = () => {
    getList();
    setIsModalOpen(false);
    setId("");
    setFormData({
      keyword: "",
      platform: "",
      language: "",
    });
    setCurrentPage(1);
    setIsLoading(false);
  };

  // 数据已经由服务器分页和过滤

  return (
    <AuthWrapper>
      <h2 className="font-bold text-2xl mb-4">播客管理</h2>
      <div className="flex gap-4 mb-4">
        <Input
          isClearable={true}
          label="关键字"
          labelPlacement="inside"
          name="keyword"
          placeholder="查询标题和描述包含关键字的数据"
          type="text"
          value={formData.keyword}
          onChange={(e) => {
            setFormData({
              ...formData,
              keyword: e.target.value,
            });
          }}
          onClear={() => {
            setFormData({
              ...formData,
              keyword: "",
            });
          }}
        />

        <Select
          isClearable={true}
          label="平台"
          labelPlacement="inside"
          name="platform"
          placeholder="请选择平台"
          value={formData.platform}
          onSelectionChange={(e) => {
            setFormData({
              ...formData,
              platform: e.currentKey as string,
            });
          }}
        >
          {podcastPlatform.map((platform) => (
            <SelectItem key={platform.key}>{platform.name}</SelectItem>
          ))}
        </Select>

        <Select
          isClearable={true}
          label="语言"
          labelPlacement="inside"
          name="language"
          placeholder="请选择语言"
          value={formData.language}
          onSelectionChange={(e) => {
            setFormData({
              ...formData,
              language: e.currentKey as string,
            });
          }}
        >
          <SelectItem key="en">English</SelectItem>
          <SelectItem key="zh-CN">中文</SelectItem>
        </Select>

        <div className="space-y-2">
          <Button size="sm" onPress={handleSearch}>
            搜索
          </Button>
          <Button
            color="primary"
            size="sm"
            onPress={() => setIsModalOpen(true)}
          >
            新增
          </Button>
        </div>
      </div>

      <Table isHeaderSticky isStriped aria-label="播客管理表格">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} width={column.width}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={podcasts || []}
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

      <Pagination
        currentPage={pagination.page}
        hasNext={pagination.page < pagination.totalPages}
        hasPrev={pagination.page > 1}
        total={pagination.total}
        totalPages={pagination.totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      {/* Toast 通知 */}
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} {...toastItem} />
      ))}

      <PodcastForm
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

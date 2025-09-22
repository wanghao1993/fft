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

import { useToast } from "@/components/ui/Toast";
import { Toast } from "@/components/ui/Toast";
import Pagination from "@/components/admin/Pagination";
import AuthWrapper from "@/components/admin/AuthWrapper";
import {
  deleteById,
  getQuickNews,
  updateNewsById,
} from "@/service/module/quick_news";
import { Link } from "@/i18n/navigation";
import { News, NewsResponse } from "@/types/news";
import NewsModal from "@/components/admin/NewModal";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsResponse["data"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast, toasts } = useToast();

  const [pagi, setPagi] = useState<NewsResponse["meta"]>();
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      key: "title",
      label: "标题",
      with: 300,
    },
    {
      key: "tags",
      label: "标签",
      with: 160,
    },
    {
      key: "fix_top",
      label: "置顶",
      width: 160,
    },
    {
      key: "source",
      label: "来源",
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
  const onFixTop = async (id: string, value: boolean) => {
    await updateNewsById(id, {
      fixTop: value,
    });
    getList();
  };

  const [id, setId] = useState<string>("");
  const onEdit = async (id: string) => {
    setId(id);
    setIsModalOpen(true);
  };

  const renderCell = useCallback((item: News, columnKey: string | number) => {
    if (columnKey === "publishedAt") {
      return dayjs(item.publishedAt * 1000).format("YYYY-MM-DD HH:mm");
    } else if (columnKey === "tags") {
      return item.tags.map((item) => item.name).join(", ");
    } else if (columnKey === "publishedAt") {
      return dayjs(item.publishedAt * 1000).format("YYYY-MM-DD HH:mm");
    } else if (columnKey === "fix_top") {
      return (
        <div className="flex flex-col">
          <Switch
            isSelected={item.fixTop}
            size="sm"
            onValueChange={(value) => onFixTop(item.uuid, value)}
          />
          {item.fixTopExpiryAt && (
            <span className="text-sm text-gray-500">
              结束时间： {dayjs(item.fixTopExpiryAt).format("YYYY/MM/DD HH:mm")}
            </span>
          )}
        </div>
      );
    } else if (columnKey === "action") {
      return (
        <div className="flex gap-4">
          <Button color="primary" size="sm" onPress={() => onEdit(item.uuid)}>
            编辑
          </Button>
          <Button color="danger" size="sm" onPress={() => onDelete(item.uuid)}>
            删除
          </Button>
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
      const response = await getQuickNews({
        limit: 20,
        page: currentPage,
        ...formData,
      });

      setPagi(response.meta);

      setNews(response.data);
    } catch (error: any) {
      toast.error({
        title: "错误",
        description: "加载新闻列表失敗",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  const onDelete = async (id: string) => {
    if (confirm(`确定删除吗？`)) {
      await deleteById(id);
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

  const [formData, setFormData] = useState({
    keyword: "",
    category: "",
    language: "",
  });

  const handleSearch = () => {
    getList();
  };

  const handleModalSuccess = () => {
    getList();
    setIsModalOpen(false);
    setId("");
    setFormData({
      keyword: "",
      category: "",
      language: "",
    });
    setCurrentPage(1);
    setIsLoading(false);
  };

  return (
    <AuthWrapper>
      <h2 className="font-bold text-2xl mb-4">新闻管理</h2>
      <div className="flex gap-4 mb-4">
        <Input
          isClearable={true}
          label="关键字"
          labelPlacement="inside"
          name="keyword"
          placeholder="查询标题，内容和标签包含关键字的数据"
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
          <SelectItem key="quick_news">快讯</SelectItem>
          <SelectItem key="hot_news">热点新闻</SelectItem>
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
          items={news || []}
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
        currentPage={pagi?.page || 0}
        hasNext={pagi?.hasNext || false}
        hasPrev={pagi?.hasPrev || false}
        total={pagi?.total || 0}
        totalPages={pagi?.totalPages || 0}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      {/* Toast 通知 */}
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} {...toastItem} />
      ))}

      <NewsModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </AuthWrapper>
  );
}

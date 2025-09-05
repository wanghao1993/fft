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

import { useToast } from "@/components/ui/Toast";
import { Toast } from "@/components/ui/Toast";
import Pagination from "@/components/admin/Pagination";
import AuthWrapper from "@/components/admin/AuthWrapper";
import { deleteVideo, getVideos } from "@/service/module/videos";
import { Video, VideoResponse } from "@/types/videos";

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
      key: "source",
      label: "来源",
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

  const renderCell = useCallback((item: Video, columnKey: string | number) => {
    if (columnKey === "publishedAt") {
      return dayjs(item.publishedAt).format("YYYY-MM-DD HH:mm");
    } else if (columnKey === "action") {
      return (
        <div className="flex gap-4">
          <Button color="danger" size="sm" onPress={() => onDelete(item.uuid)}>
            删除
          </Button>
        </div>
      );
    }

    return getKeyValue(item, columnKey);
  }, []);

  const getList = async () => {
    setIsLoading(true);
    try {
      const response = await getVideos({
        limit: 20,
        category: "",
        page: currentPage,
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

  useEffect(() => {
    getList();
  }, []);

  return (
    <AuthWrapper>
      <div className="container mx-auto px-4">
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
      </div>
    </AuthWrapper>
  );
}

"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import dayjs from "dayjs";
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";

import { Article } from "@/types/blog";
import { Link } from "@/i18n/navigation";

interface ArticleTableProps {
  articles: Article[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
}

export default function ArticleTable({
  articles = [],
  isLoading,
  onDelete,
}: ArticleTableProps) {
  const handleDelete = async (id: string) => {
    await onDelete(id);
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
        <Link href={"write"}>
          <Button color="primary">新增文章</Button>
        </Link>
      </div>

      <Table aria-label="标签列表">
        <TableHeader>
          <TableColumn>标题</TableColumn>
          <TableColumn>创建时间</TableColumn>
          <TableColumn>更新时间</TableColumn>
          <TableColumn>阅读量</TableColumn>
          <TableColumn>操作</TableColumn>
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
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Popover color="danger" placement="top">
                      <PopoverTrigger>
                        <Button color="danger" size="sm" variant="bordered">
                          删除
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent>
                        <div>是否确认删除？</div>
                        <div className="mt-2 flex justify-end">
                          <Button
                            size="sm"
                            onPress={() => handleDelete(article.id)}
                          >
                            确认
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
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

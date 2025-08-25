"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { getQuickNews } from "@/service/module/quick_news";
import { News } from "@/types/news";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Chip } from "@heroui/chip";
import { useLocale, useTranslations } from "next-intl";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { Send, Twitter, X } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";

dayjs.extend(relativeTime);
import { handleShare } from "@/utils/share";

export default function QuickNewsList() {
  const path = usePathname();
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const t = useTranslations("Common");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  useEffect(() => {
    setPage(1);
    setNewsItems([]);
  }, [locale]);
  useEffect(() => {
    if (path === "/quick-news") {
      if (!hasMore) return;
      setLoading(true);
      getQuickNews({
        category: "quick_news",
        page: page,
        limit: 20,
      })
        .then((res) => {
          setNewsItems([...newsItems, ...res.data]);
          setHasMore(res.meta.hasNext);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [path, page, hasMore]);
  return (
    <>
      <div className="grid grid-cols-1 gap-6 min-h-screen">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.uuid || item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b py-2 border-b-gray-200 flex"
          >
            <div className="w-15">
              {dayjs(item.publishedAt * 1000).format("HH:mm")}
            </div>

            <div className="flex-1">
              <Link
                href={`${item.link}`}
                target="_blank"
                className="hover:text-blue-600 text-blue-400 font-semibold"
              >
                {item.title}
              </Link>
              <div className="text-default-400">{item.summary}</div>

              <div className="flex justify-between">
                <Chip color="default" className="mt-3">
                  {item.source}
                </Chip>
                <div className="flex items-center gap-2">
                  <Tooltip content="分享到 Twitter">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={(e) => {
                        handleShare("twitter", item.title);
                      }}
                    >
                      <Image
                        src="/images/x.svg"
                        alt="x"
                        width={16}
                        height={16}
                        className="h-3 w-3"
                      />
                    </Button>
                  </Tooltip>

                  <Tooltip content="分享到 Telegram">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onPress={(e) => {
                        handleShare("telegram", item.title);
                      }}
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="space-y-2">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
          </div>
        )}
      </div>

      {hasMore && (
        <div
          className="text-center py-4 cursor-pointer"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {t("loadMore")}
        </div>
      )}
    </>
  );
}

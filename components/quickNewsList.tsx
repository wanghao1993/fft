"use client";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Chip } from "@heroui/chip";
import { useLocale, useTranslations } from "next-intl";
import { Skeleton } from "@heroui/skeleton";

dayjs.extend(relativeTime);
import { Button } from "@heroui/button";

import Share from "./share";

import { Link, usePathname } from "@/i18n/navigation";
import { getQuickNews } from "@/service/module/quick_news";
import { News } from "@/types/news";

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
        language: locale,
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
        {newsItems.map((item) => (
          <motion.div
            key={item.uuid}
            className="border-b py-2 border-b-gray-200 flex"
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="w-32">
              {dayjs(item.publishedAt * 1000).format("YYYY-MM-DD HH:mm")}
            </div>

            <div className="flex-1">
              <Link
                className="hover:text-primary font-medium"
                href={`/news/${item.uuid}`}
                target="_blank"
              >
                {item.title}
              </Link>
              <div
                dangerouslySetInnerHTML={{ __html: item.summary }}
                className="line-clamp-2 text-default-700"
              />

              <div className="flex justify-between">
                <Chip className="mt-3" color="primary">
                  {item.source}
                </Chip>
                <Share canShare={true} data={item} />
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
        <Button
          color="primary"
          onPress={() => {
            setPage(page + 1);
          }}
        >
          {t("loadMore")}
        </Button>
      )}
    </>
  );
}

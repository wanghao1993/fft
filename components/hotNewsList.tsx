"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Chip } from "@heroui/chip";
import { useLocale, useTranslations } from "next-intl";
import { Spinner } from "@heroui/spinner";
import dayjs from "dayjs";
import { Button } from "@heroui/button";

import Share from "./share";

import { News } from "@/types/news";
import { getQuickNews } from "@/service/module/quick_news";
import { Link } from "@/i18n/navigation";

export default function HotNewList() {
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
    if (!hasMore) return;
    setLoading(true);
    getQuickNews({
      category: "hot_news",
      page: page,
      limit: 10,
      language: locale,
    })
      .then((res) => {
        setNewsItems([...newsItems, ...res.data]);
        setHasMore(res.meta.hasNext);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, hasMore]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 min-h-screen">
        {newsItems.map((item) => (
          <motion.div
            key={item.uuid}
            className="border-b py-2 border-b-gray-200 grid grid-cols-[120px_1fr]"
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div>
              {dayjs(item.publishedAt * 1000).format("YYYY-MM-DD HH:mm")}
            </div>

            <div>
              <Link
                className="hover:text-primary font-medium"
                href={`/news/${item.uuid}`}
                target="_blank"
              >
                {item.title}
              </Link>
              <div
                dangerouslySetInnerHTML={{ __html: item.summary }}
                className="text-default-700 line-clamp-2"
              />

              <div className="flex justify-between">
                <Chip className="mt-3" color="primary">
                  {item.source}
                </Chip>
                <Share data={item} />
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>

      {hasMore && !loading && (
        <Button
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

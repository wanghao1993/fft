"use client";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Chip } from "@heroui/chip";
import { useLocale, useTranslations } from "next-intl";
import { Spinner } from "@heroui/spinner";

import Share from "./share";

import { News } from "@/types/news";
import { getQuickNews } from "@/service/module/quick_news";
import { Link } from "@/i18n/navigation";
import { DateFormat } from "./date.format";

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
            key={item.uuid || item.id}
            className="border-b py-2 border-b-gray-200 grid grid-cols-[120px_1fr]"
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div>{DateFormat({ date: item.publishedAt })}</div>

            <div>
              <Link
                className="hover:text-primary  font-semibold"
                href={`${item.link}`}
                target="_blank"
              >
                {item.title}
              </Link>
              <div
                className="text-default-400 line-clamp-2"
                style={{
                  overflowWrap: "anywhere",
                }}
              >
                {item.summary}
              </div>

              <div className="flex justify-between">
                <Chip className="mt-3" color="default">
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
        <div
          aria-label={t("loadMore")}
          className="text-center py-4 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => {
            setPage(page + 1);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPage(page + 1);
            }
          }}
        >
          {t("loadMore")}
        </div>
      )}
    </>
  );
}

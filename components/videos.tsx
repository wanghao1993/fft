"use client";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Spinner } from "@heroui/spinner";

import { VideoItem } from "./videoItem";

import { Video } from "@/types/videos";
import { getVideos } from "@/service/module/videos";
import { usePathname } from "@/i18n/navigation";

dayjs.extend(relativeTime);
export function Videos() {
  const path = usePathname();
  const [videos, setVideos] = useState<Video[]>([]);
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const tc = useTranslations("Common");

  useEffect(() => {
    setPage(1);
    setVideos([]);
  }, [locale, path]);
  useEffect(() => {
    setIsLoading(true);
    getVideos({
      category: path === "/podcasts" ? "podcast" : "video",
      language: locale,
      page,
      limit: 12,
    })
      .then((res) => {
        setVideos([...videos, ...res.data]);
        setHasMore(res.meta.hasNext);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [locale, page]);

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <motion.div
              key={video.uuid}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <VideoItem locale={locale} video={video} />
            </motion.div>
          ))}
        </div>
        {hasMore && !isLoading && (
          <div className="flex justify-center py-8">
            <Button
              className="mt-4"
              isDisabled={!hasMore}
              onPress={() => setPage(page + 1)}
            >
              {tc("loadMore")}
            </Button>
          </div>
        )}

        {/* YouTube Channel CTA */}
        {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Card
          className="max-w-lg mx-auto"
          style={{ backgroundColor: "#fef2f2" }}
        >
          <CardBody className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 bg-danger rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-white ml-1" />
              </div>
            </div>
            <h3 className="font-bold text-foreground mb-2">
              订阅我们的 YouTube 频道
            </h3>
            <p className="text-default-500 mb-4 text-sm">
              获取最新的 Web3 和加密货币视频内容
            </p>
            <Button
              color="danger"
              startContent={<ExternalLink className="h-4 w-4" />}
            >
              订阅频道
            </Button>
          </CardBody>
        </Card>
      </motion.div> */}

        {isLoading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
}

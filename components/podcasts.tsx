"use client";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./imageWithFallBack";
import { useLocale, useTranslations } from "next-intl";
import ViewMore from "./viewMore";
import { useEffect, useState } from "react";
import { getVideos } from "@/service/module/videos";
import { Video } from "@/types/videos";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@/i18n/navigation";
import { Spinner } from "@heroui/spinner";
dayjs.extend(relativeTime);
export function PodCasts() {
  const t = useTranslations("Podcasts");
  const [videos, setVideos] = useState<Video[]>([]);
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getVideos({
      language: locale,
    })
      .then((res) => {
        setVideos(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [locale]);

  return (
    <section className="py-8 bg-default-50 w-full" id="podcasts">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
          </motion.div>
          <ViewMore type="podcasts" />
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.uuid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={video.link} target="_blank">
                <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative">
                    <ImageWithFallback
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        isIconOnly
                        color="primary"
                        size="lg"
                        className="rounded-full w-16 h-16"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {/* {video.duration} */}
                    </div>

                    {/* Platform Badge */}
                    <Chip
                      color="danger"
                      className="absolute top-2 left-2"
                      size="sm"
                    >
                      {video.channel}
                    </Chip>
                  </div>

                  <CardBody className="p-4">
                    <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    {/* <p className="text-sm text-default-500 mb-3">
                    {video}
                  </p> */}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-default-500">
                        <span>YouTube</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-default-500">
                        <Clock className="h-3 w-3" />
                        <span>{dayjs(video.publishedAt * 1000).fromNow()}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

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
            <Spinner></Spinner>
          </div>
        )}
      </div>
    </section>
  );
}

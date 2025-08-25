"use client";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Clock, TowerControlIcon, Send } from "lucide-react";
import { motion } from "framer-motion";

import { useLocale, useTranslations } from "next-intl";
import ViewMore from "./viewMore";
import { useEffect, useState } from "react";
import { getQuickNews } from "@/service/module/quick_news";
import { News } from "@/types/news";
import { handleShare } from "@/utils/share";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
dayjs.extend(relativeTime);

export function HowNews() {
  const t = useTranslations("HotNews");
  const [loading, setLoading] = useState(false);
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const locale = useLocale();
  useEffect(() => {
    setLoading(true);
    getQuickNews({
      category: "hot_news",
      page: 1,
      limit: 9,
      language: locale,
    })
      .then((res) => {
        setNewsItems(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [locale]);
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      安全: "danger",
      交易所: "primary",
      ETH: "secondary",
      市场: "success",
      ETF: "warning",
      BTC: "warning",
      DeFi: "secondary",
      投资: "primary",
      分析: "default",
    };
    return colors[category] || "default";
  };

  return (
    <section
      id="hot-news"
      className="bg-default-50 px-4 sm:px-6 lg:px-8 py-8 w-full"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl font-bold text-foreground mb-2"
              id="quick-news"
            >
              {t("title")}{" "}
              <span className="text-default-500">({t("subtitle")})</span>
            </h2>
          </motion.div>
          <ViewMore type="hot-news" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.uuid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardBody className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Chip
                      color={getCategoryColor(item.category) as any}
                      size="sm"
                      variant="flat"
                    >
                      {item.category}
                    </Chip>
                    <div className="flex items-center gap-2">
                      <Tooltip content="分享到 Twitter">
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onPress={(e) => {
                            handleShare("twitter", item.title);
                          }}
                        >
                          <Image
                            src={"/images/x.svg"}
                            width={12}
                            height={12}
                            alt="twitter"
                          />
                        </Button>
                      </Tooltip>

                      <Tooltip content="分享到 Telegram">
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onPress={(e) => {
                            handleShare("telegram", item.title);
                          }}
                        >
                          <Send className="h-3 w-3" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-default-500 mb-3 line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs text-default-500">
                    <div className="flex items-center gap-1">
                      <span>{item.source}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{dayjs(item.publishedAt * 1000).fromNow()}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center">
            <Spinner></Spinner>
          </div>
        )}
      </div>
    </section>
  );
}

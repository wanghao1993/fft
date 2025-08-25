"use client";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Clock, TowerControlIcon, Send } from "lucide-react";
import { motion } from "framer-motion";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Interviews() {
  const t = useTranslations("Interviews");
  const locale = useLocale();

  const list = [
    {
      id: 1,
      title: "专访赵长鹏：人生如牌局，唯有向前，如今更关注人才、时间与健康",
      link: "https://www.chaincatcher.com/article/2190073",
      language: "zh-CN",
    },
    {
      id: 2,
      title:
        "《财富》专访何一：从井边女孩到加密女王，亲述币安生死劫与她的首席客服哲学",
      link: "https://www.chaincatcher.com/article/2197651",
      language: "zh-CN",
    },
    {
      id: 3,
      title: "专访徐明星",
      link: "https://www.blocktempo.com/search/tag/%E5%BE%90%E6%98%8E%E6%98%9F/",
      language: "zh-CN",
    },
    {
      id: 4,
      title:
        "Tether CEO Says He'll Comply With GENIUS to Come to U.S., Circle Says It's Set Now",
      link: "https://www.coindesk.com/policy/2025/07/18/tether-ceo-says-he-ll-comply-with-genius-to-come-to-u-s-circle-says-it-s-set-now",
      language: "en",
    },
  ];

  const newsItems = list.filter((item) => item.language === locale);

  return (
    <section id="interviews" className="py-6 bg-default-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              {t("title")}
            </h2>
          </motion.div>
          {/* <ViewMore type="interviews" /> */}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Link
                href={item.link}
                target="_blank"
                className="border-b w-full hover:text-primary"
              >
                {index + 1}. {item.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

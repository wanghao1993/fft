"use client";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Clock, TowerControlIcon, Send } from "lucide-react";
import { motion } from "framer-motion";

import { useTranslations } from "next-intl";
import ViewMore from "./viewMore";

export function QuickNews() {
  const t = useTranslations("QuickNews");
  const newsItems = [
    {
      id: 1,
      title: "区块链安全公司深度化，以助止亚洲乖年期明漏洞",
      source: "Cointelegraph",
      time: "38m",
      category: "安全",
      excerpt: "全新安全协议预计将大幅降低智能合约风险...",
    },
    {
      id: 2,
      title: "纳斯达克将首现加密货币交易所审查品牌代币BANAC",
      source: "Cointelegraph",
      time: "1h",
      category: "交易所",
      excerpt: "此举标志着传统金融与加密货币的进一步融合...",
    },
    {
      id: 3,
      title: "以太坊大型升级项目于十月开时：$ 8.8亿以下代币Bitmine、WHALE投线",
      source: "Cointelegraph",
      time: "3h",
      category: "ETH",
      excerpt: "以太坊开发者确认升级时间表，预计将提升网络性能...",
    },
    {
      id: 4,
      title: "纳斯达克将网友进入冲亿列384亿美元：这对以太坊价格意味着什么？",
      source: "Cointelegraph",
      time: "6h",
      category: "市场",
      excerpt: "巨额资金流入可能对以太坊生态产生重大影响...",
    },
    {
      id: 5,
      title: "现货以太坊ETF在美国投入3.78亿人后首日总流出",
      source: "Cointelegraph",
      time: "6h",
      category: "ETF",
      excerpt: "ETF首日表现引发市场关注，分析师给出不同观点...",
    },
    {
      id: 6,
      title: "比特币取消将明年以亿列384亿美元：这对以太坊价格意味着什么？",
      source: "Cointelegraph",
      time: "8h",
      category: "BTC",
      excerpt: "比特币价格走势对整个加密市场产生连锁反应...",
    },
    {
      id: 7,
      title: "比特币取消周期明年以亿列384亿美元：这对以太坊价格意味着什么？",
      source: "Cointelegraph",
      time: "8h",
      category: "DeFi",
      excerpt: "DeFi协议的最新发展吸引了大量投资者关注...",
    },
    {
      id: 8,
      title:
        "比特币市值首现「基础设施」备受看好 上本年：Sentiment 400亿投资基奇",
      source: "Cointelegraph",
      time: "11h",
      category: "投资",
      excerpt: "大型投资基金看好比特币基础设施发展前景...",
    },
    {
      id: 9,
      title: "比特币市值下九六存在将确建385亿美元，这对以太坊",
      source: "Cointelegraph",
      time: "11h",
      category: "分析",
      excerpt: "市场分析师对当前比特币走势给出最新解读...",
    },
  ];

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

  const handleShare = (platform: string, title: string) => {
    const url = window.location.href;
    const text = title;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        );
        break;
      default:
        navigator.clipboard?.writeText(`${text} - ${url}`);
    }
  };

  return (
    <section id="news" className="py-6 bg-default-50">
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
          <ViewMore type="quick-news" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
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
                          <TowerControlIcon className="h-3 w-3" />
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
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-default-500">
                    <div className="flex items-center gap-1">
                      <span>{item.source}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

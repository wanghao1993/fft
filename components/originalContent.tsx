"use client";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Clock, User, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./imageWithFallBack";
import { useTranslations } from "next-intl";
import ViewMore from "./viewMore";

export function OriginalContent() {
  const t = useTranslations("Deep");
  const articles = [
    {
      id: 1,
      title: "特朗普举行401(k)投向加密货币：万亿资金池的制度性解析",
      excerpt:
        "美国总统特朗普上台后首次确认，允许401(k)养老金计划直接投资加密货币。这意味着，美国总体万亿美元的养老金，预期收说现这万亿美元的资联将直接进入加密资产市场价格可能下不了！我们…",
      readTime: "5 分钟阅读",
      author: "Future Frontier 编辑部",
      publishDate: "2天前",
      category: "深度分析",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-background w-full" id="in-depth">
      <div className="container mx-auto ">
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
          <ViewMore type="in-depth" />
        </div>

        {/* Featured Article */}
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-2/5 relative">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  {article.featured && (
                    <Chip
                      color="primary"
                      className="absolute top-4 left-4"
                      size="sm"
                    >
                      精选文章
                    </Chip>
                  )}
                </div>

                {/* Content */}
                <CardBody className="md:w-3/5 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Chip variant="flat" size="sm">
                      {article.category}
                    </Chip>
                    <div className="flex items-center gap-1 text-xs text-default-500">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-default-500 mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-default-500">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <span className="text-default-500">·</span>
                      <span className="text-sm text-default-500">
                        {article.publishDate}
                      </span>
                    </div>

                    <Button
                      variant="light"
                      size="sm"
                      className="group/btn"
                      endContent={
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      }
                    >
                      阅读全文
                    </Button>
                  </div>
                </CardBody>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Content Categories Grid */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 "
        >
          {[
            {
              name: "深度分析",
              count: "45+",
              icon: BookOpen,
              color: "primary",
            },
            {
              name: "行业观察",
              count: "32+",
              icon: BookOpen,
              color: "success",
            },
            {
              name: "技术解读",
              count: "28+",
              icon: BookOpen,
              color: "secondary",
            },
            {
              name: "市场洞察",
              count: "56+",
              icon: BookOpen,
              color: "warning",
            },
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg w-full transition-shadow duration-300 cursor-pointer group">
                  <CardBody className="space-y-4">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center mx-auto bg-${category.color}/10`}
                    >
                      <Icon className={`h-6 w-6 text-${category.color}`} />
                    </div>
                    <div className="text-center ">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-default-500 mt-1">
                        {category.count} 篇文章
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div> */}

        {/* Newsletter CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">订阅我们的深度分析</h3>
              <p className="text-primary-foreground/90 mb-6">
                每周获取最新的 Web3、加密货币和 AI 技术深度分析报告
              </p>
              <div className="flex flex-col items-center sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="flex-1"
                  variant="flat"
                />
                <Button>立即订阅</Button>
              </div>
            </CardBody>
          </Card>
        </motion.div> */}
      </div>
    </section>
  );
}

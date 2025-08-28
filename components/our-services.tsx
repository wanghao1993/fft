"use client";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Services() {
  const services = [
    {
      title: "Web3全策略",
      description: "定位 / 政策 / 市场、A+ 0→+100",
    },
    {
      title: "媒体公关",
      description: "中英双语体，新闻稿，KOL 联动",
    },
    {
      title: "增长与社区",
      description: "任务增长，生态合作，完成与Meetup",
    },
    {
      title: "产品与技术",
      description: "咨询 / 开发 / 智能合约 / Bot / 上链咨服",
    },
    {
      title: "文件与节点",
      description: "时达与可视化界明 / 可复利及技术",
    },
    {
      title: "品牌资产",
      description: "Logo / VI / Pitch Deck / Media Kit",
    },
  ];

  return (
    <section className="py-16 bg-default-50 w-full" id="about-us">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">服务</h2>
          <p className="text-lg text-default-500 max-w-2xl mx-auto">
            为Web3项目提供全方位的咨询和技术服务
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </CardHeader>

                  <CardBody className="space-y-4">
                    <p className="text-sm text-default-500">
                      {service.description}
                    </p>
                    <Button
                      className="w-full group/btn"
                      endContent={
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      }
                      variant="bordered"
                    >
                      了解详情
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

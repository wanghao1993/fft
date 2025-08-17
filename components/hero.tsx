"use client";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { ArrowRight, TrendingUp, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const trendingTopics = [
    "Web3",
    "Crypto",
    "RWA",
    "Stablecoin",
    "AI",
    "DeFi",
    "NFT",
    "Layer2",
  ];

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 mb-8 bg-primary/10 rounded-full border border-primary/20"
          >
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            <span className="text-primary font-medium">
              Future Frontier 技术前瞻
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            聚焦 <span className="text-primary">Web3</span> /{" "}
            <span className="text-primary">Crypto</span> /{" "}
            <span className="text-primary">RWA</span> /{" "}
            <span className="text-primary">Stablecoin</span> /{" "}
            <span className="text-primary">AI</span>
            <br />
            等新金融与未来科技融合赛道
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-default-500 mb-8 max-w-3xl mx-auto"
          >
            Future Frontier 梵炘无界
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-default-500 mb-8 max-w-3xl mx-auto"
          >
            是一家专注于科技与资本交汇点的品牌智库与传播机构。我们致力于解构未来趋势，洞察全球创新，在无界思维中点燃增长引擎。
          </motion.p>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Chip
                  variant="flat"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  #{topic}
                </Chip>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              color="primary"
              size="lg"
              endContent={
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              startContent={<Zap className="h-4 w-4" />}
              className="group"
            >
              浏览最新资讯
            </Button>
            <Button
              variant="bordered"
              size="lg"
              startContent={<Globe className="h-4 w-4" />}
              className="group"
            >
              深度分析
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-divider"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">10000+</div>
              <div className="text-default-500">读者关注</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">500+</div>
              <div className="text-default-500">深度文章</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-default-500">实时更新</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

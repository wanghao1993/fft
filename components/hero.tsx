"use client";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { ArrowRight, TrendingUp, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { EmblaCarousel } from "./carousel";

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
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-4xl lg:text-xl font-bold text-foreground mb-6"
          >
            聚焦 <span className="text-primary">Web3</span> /{" "}
            <span className="text-primary">Crypto</span> /{" "}
            <span className="text-primary">RWA</span> /{" "}
            <span className="text-primary">Stablecoin</span> /{" "}
            <span className="text-primary">AI</span>
            等新金融与未来科技融合赛道
          </motion.h1> */}

          <EmblaCarousel />

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
        </div>
      </div>
    </section>
  );
}

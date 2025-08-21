"use client";

import { motion } from "framer-motion";
import { EmblaCarousel } from "./carousel";
import { useTranslations } from "next-intl";
import { Roboto_Mono } from "next/font/google";
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}

          <div className="hidden md:block">
            <EmblaCarousel />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-lg sm:text-3xl  font-bold text-foreground mt-12 leading-12 ${robotoMono.className}`}
          >
            {t("title")}
          </motion.h1>

          {/* Trending Topics */}
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import "../styles/custom.css";
import { Link } from "@/i18n/navigation";
import { DynamicImage, getImageData } from "./dynamic-image";
import { useTranslations } from "next-intl";

const partners = getImageData("partners");

export default function Partners() {
  const t = useTranslations("Partners");
  return (
    <section id="partners" className="py-8 bg-default-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative mt-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-default-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-default-50 to-transparent z-10 pointer-events-none" />

          <div className="relative overflow-hidden">
            <motion.div className="group flex overflow-hidden flex-row gap-[130px]">
              <figure className="flex shrink-0 justify-around gap-[120px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link
                    href={img.url}
                    key={img.filename}
                    target="_blank"
                    className="!w-[130px] !h-[36px]"
                  >
                    <DynamicImage
                      key={img.filename}
                      src={img.url}
                      className="!static"
                      alt={img.filename}
                    />
                  </Link>
                ))}
              </figure>
              <figure className="flex shrink-0 justify-around gap-[120px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link
                    href={img.url}
                    key={img.filename + "_copy"}
                    target="_blank"
                    className="!w-[130px] !h-[36px]"
                  >
                    <DynamicImage
                      key={img.filename}
                      src={img.url}
                      className="!static"
                      alt={img.filename}
                    />
                  </Link>
                ))}
              </figure>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

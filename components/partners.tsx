"use client";
import { motion } from "framer-motion";
import "../styles/custom.css";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import { getPartners } from "@/service/module/partners";
import { Partner } from "@/types/partners";

export default function Partners() {
  const t = useTranslations("Partners");

  const [partners, setPartners] = useState<Partner[]>([]);

  const getImages = async () => {
    const images = await getPartners();

    setPartners(images);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <section className="py-8 w-full" id="partners">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative mt-8">
          <div className="absolute left-0 top-0 bottom-0 w-16  z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16  z-10 pointer-events-none" />

          <div className="relative overflow-hidden">
            <motion.div className="group flex overflow-hidden flex-row gap-[130px]">
              <figure className="flex shrink-0 justify-around gap-[120px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link key={img.id} href={img.url} target="_blank">
                    <img alt={img.name} className="h-[60px]" src={img.image} />
                  </Link>
                ))}
              </figure>
              <figure className="flex shrink-0 justify-around gap-[120px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link key={img.id + "_copy"} href={img.url} target="_blank">
                    <img alt={img.name} className="h-[60px]" src={img.image} />
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

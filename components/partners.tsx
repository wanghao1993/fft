"use client";
import { motion } from "framer-motion";
import "../styles/custom.css";
import { Link } from "@/i18n/navigation";
import { DynamicImage, getImageData } from "./dynamic-image";
interface Partner {
  id: number;
  logo: string;
  url: string;
}

const partners = getImageData("partners");

export default function Partners() {
  return (
    <section id="partners" className="py-16 bg-default-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">合作伙伴</h2>
          <p className="text-muted-foreground mb-8">
            与行业领先企业携手共创未来
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-default-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-default-50 to-transparent z-10 pointer-events-none" />

          <div className="relative overflow-hidden">
            <motion.div className="group flex overflow-hidden flex-row gap-[120px]">
              <figure className="flex shrink-0 justify-around gap-[120px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link href={img.url} key={img.filename} target="_blank">
                    <DynamicImage
                      key={img.filename}
                      src={img.url}
                      height={36}
                      width={130}
                      className="!h-9 !w-auto object-fill hover:scale-110 transition-all duration-300"
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
                    className="h-14"
                  >
                    <DynamicImage
                      key={img.filename}
                      src={img.url}
                      height={36}
                      width={130}
                      className="!h-9 !w-auto object-fill hover:scale-110 transition-all duration-300"
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

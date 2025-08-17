"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/custom.css";
import { Link } from "@/i18n/navigation";
interface Partner {
  id: number;
  logo: string;
  url: string;
}

const partners: Partner[] = [
  {
    id: 1,
    logo: "/images/biance.png",
    url: "https://www.binance.com/",
  },
  { id: 2, logo: "/images/okx.png", url: "https://www.okx.com/" },
  {
    id: 3,
    logo: "/images/avalanche.png",
    url: "https://www.avax.network/",
  },

  { id: 4, logo: "/images/coin.png", url: "https://cointelegraph.com/" },
  {
    id: 5,
    logo: "/images/biance.png",
    url: "https://www.binance.com/",
  },
  { id: 6, logo: "/images/okx.png", url: "https://www.okx.com/" },

  {
    id: 7,
    logo: "/images/avalanche.png",
    url: "https://www.avax.network/",
  },

  { id: 8, logo: "/images/coin.png", url: "https://cointelegraph.com/" },
];

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
            <motion.div className="group flex overflow-hidden flex-row gap-[50px]">
              <figure className="flex shrink-0 justify-around gap-[80px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link href={img.url} key={img.id} target="_blank">
                    <Image
                      key={img.id + "_copy"}
                      src={img.logo}
                      height={40}
                      width={130}
                      className="object-contain"
                      alt={img.id.toString()}
                    />
                  </Link>
                ))}
              </figure>
              =
              <figure className="flex shrink-0 justify-around gap-[80px] animate-marquee flex-row group-hover:[animation-play-state:paused] ">
                {partners.map((img) => (
                  <Link href={img.url} key={img.id + "_copy"} target="_blank">
                    <Image
                      key={img.id + "_copy"}
                      src={img.logo}
                      height={40}
                      width={130}
                      className="object-contain"
                      alt={img.id.toString()}
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

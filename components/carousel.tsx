"use client";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../styles/carsousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DynamicImage, getImageData } from "./dynamic-image";
import { Blog } from "@/types/blog";
import { getCarousel } from "@/service/module/carousel";
import Image from "next/image";
import Link from "next/link";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 10000 })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 动态获取轮播图数据
  type Article = Blog & {
    url: string;
  };
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getCarousel().then((res) => {
      setArticles(
        res.items.map((item, index) => ({
          ...item,
          url: `https://blog.futurefrontier.ai/usr/uploads/2025/08/1577850860.png`,
        }))
      );
    });
  }, []);

  return (
    <div className="embla w-full relative overflow-hidden pl-4 " ref={emblaRef}>
      <div className="embla__container">
        {articles.map((item, index) => (
          <div key={index} className="embla__slide aspect-[3/2] min-h-[210px]">
            <Link
              href={item.link}
              target="_blank"
              className="block w-full h-full"
            >
              <Image
                src={item.url}
                fill
                alt={item.title}
                priority={index === 0}
              />
            </Link>
          </div>
        ))}
      </div>
      <span
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2 left-1 p-1 cursor-pointer bg-gray-200  rounded-full"
      >
        <ChevronLeft color="black" size={14} />
      </span>
      <span
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 right-1 p-1 cursor-pointer bg-gray-200 rounded-full"
      >
        <ChevronRight color="black" size={14} />
      </span>
    </div>
  );
}

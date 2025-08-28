"use client";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../styles/carsousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@heroui/spinner";

import { getCarousel } from "@/service/module/carousel";
import { Blog } from "@/types/blog";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 10000 })],
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCarousel()
      .then((res) => {
        setArticles(
          res.items.map((item) => ({
            ...item,
            url: `https://blog.futurefrontier.ai/usr/uploads/2025/08/1577850860.png`,
          })),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div ref={emblaRef} className="embla w-full relative overflow-hidden pl-4 ">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
      <div className="embla__container">
        {articles.map((item, index) => (
          <div
            key={index}
            className="embla__slide aspect-[2/1] lg:aspect-[3/2] min-h-[20px] lg:min-h-[395px]"
          >
            <Link
              className="block w-full h-full"
              href={item.link}
              target="_blank"
            >
              <Image
                fill
                alt={item.title}
                priority={index === 0}
                src={item.url}
              />
            </Link>
          </div>
        ))}
      </div>
      <span
        className="absolute top-1/2 -translate-y-1/2 left-1 p-1 cursor-pointer bg-gray-200  rounded-full"
        role="button"
        tabIndex={0}
        onClick={scrollPrev}
      >
        <ChevronLeft color="black" size={14} />
      </span>
      <span
        className="absolute top-1/2 -translate-y-1/2 right-1 p-1 cursor-pointer bg-gray-200 rounded-full"
        role="button"
        tabIndex={0}
        onClick={scrollNext}
      >
        <ChevronRight color="black" size={14} />
      </span>
    </div>
  );
}

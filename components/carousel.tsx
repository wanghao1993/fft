"use client";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../styles/carsousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Spinner } from "@heroui/spinner";

import { getBlogs } from "@/service/module/carousel";
import { Article } from "@/types/blog";
import { Link } from "@/i18n/navigation";

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

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBlogs()
      .then((res) => {
        setArticles(res.data || []);
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
              href={`blog/${item.id}`}
              target="_blank"
            >
              <Image
                fill
                alt={item.title}
                priority={index === 0}
                src={item.cover}
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

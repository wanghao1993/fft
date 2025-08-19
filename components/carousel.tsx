"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../styles/carsousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DynamicImage, getImageData } from "./dynamic-image";

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
  const articles = getImageData("carousel");

  return (
    <div className="embla max-w-3xl relative overflow-hidden" ref={emblaRef}>
      <div className="embla__container">
        {articles.map((item, index) => (
          <div key={index} className="embla__slide">
            <div className="absolute top-0 left-4 z-10 p-4 bg-black/50 right-0">
              <h3 className="text-white text-2xl px-4 text-left font-bold">
                {item.title}
              </h3>
            </div>
            <div style={{ width: "30vw", height: "45vh" }}>
              <DynamicImage
                src={item.url}
                alt={item.title}
                priority={index === 0} // 第一张图片优先加载
                fallbackSrc="/logo.png"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-6 bottom-2 flex bg-gray-100 rounded-full">
        <span
          onClick={scrollPrev}
          className="px-2 py-1 cursor-pointer hover:bg-gray-200 rounded-full"
        >
          <ChevronLeft color="gray" />
        </span>
        <span
          onClick={scrollNext}
          className="px-2 py-1 cursor-pointer hover:bg-gray-200 rounded-full"
        >
          <ChevronRight color="gray" />
        </span>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";

interface DynamicImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
}

export function DynamicImage({
  src,
  alt,
  className,
  fallbackSrc = "/logo.png",
  priority = false,
}: DynamicImageProps) {
  // 处理图片路径
  const processImageSrc = (imageSrc: string): string => {
    // 如果是完整的URL，直接使用
    if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
      return imageSrc;
    }

    // 如果是相对路径，添加基础路径
    if (imageSrc.startsWith("/")) {
      return imageSrc;
    }

    // 默认添加基础路径
    const basePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "/";

    return `${basePath}${imageSrc}`;
  };

  const processedSrc = processImageSrc(src);

  return (
    <Image
      fill
      alt={alt}
      className={className}
      priority={priority}
      src={processedSrc}
      onError={(e) => {
        // 如果主图片加载失败，使用fallback图片
        if (fallbackSrc && fallbackSrc !== src) {
          const target = e.target as HTMLImageElement;

          target.src = processImageSrc(fallbackSrc);
        }
      }}
    />
  );
}

// 图片配置类型
interface CarouselImage {
  title: string;
  filename: string;
}

interface PartnerImage {
  title: string;
  filename: string;
}

// 预定义的图片配置
export const IMAGE_CONFIGS = {
  // 轮播图配置
  carousel: {
    basePath: "/",
    images: [
      { title: "title-1 xxx", filename: "1.jpg" },
      { title: "title-2 xxx", filename: "2.jpg" },
      { title: "title-3 xxx", filename: "3.jpg" },
      { title: "title-4 xxx", filename: "4.jpg" },
    ] as CarouselImage[],
  },

  // 合作伙伴配置
  partners: {
    basePath: "/images/",
    images: [
      { title: "Avalanche", filename: "avalanche.png" },
      { title: "Binance", filename: "biance.png" },
      { title: "Coin", filename: "coin.png" },
      { title: "OKX", filename: "okx.png" },
    ] as PartnerImage[],
  },
};

// 获取图片数据的工具函数
export const getImageData = (configKey: keyof typeof IMAGE_CONFIGS) => {
  const config = IMAGE_CONFIGS[configKey];

  return config.images.map((item) => ({
    ...item,
    url: `${config.basePath}${item.filename}`,
  }));
};

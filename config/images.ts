// 图片路径配置
export const IMAGE_PATHS = {
  // 轮播图
  carousel: {
    basePath: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "/",
    images: [
      { title: "title-1 xxx", filename: "1.jpg" },
      { title: "title-2 xxx", filename: "2.jpg" },
      { title: "title-3 xxx", filename: "3.jpg" },
      { title: "title-4 xxx", filename: "4.jpg" },
    ],
  },

  // 合作伙伴图片
  partners: {
    basePath: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "/images/",
    images: [
      { name: "Avalanche", filename: "avalanche.png" },
      { name: "Binance", filename: "biance.png" },
      { name: "Coin", filename: "coin.png" },
      { name: "OKX", filename: "okx.png" },
    ],
  },
};

// 动态构建图片URL
export const buildImageUrl = (basePath: string, filename: string): string => {
  return `${basePath}${filename}`;
};

// 获取轮播图数据
export const getCarouselImages = () => {
  return IMAGE_PATHS.carousel.images.map((item) => ({
    title: item.title,
    url: buildImageUrl(IMAGE_PATHS.carousel.basePath, item.filename),
  }));
};

// 获取合作伙伴图片数据
export const getPartnerImages = () => {
  return IMAGE_PATHS.partners.images.map((item) => ({
    name: item.name,
    url: buildImageUrl(IMAGE_PATHS.partners.basePath, item.filename),
  }));
};

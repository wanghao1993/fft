import { getLocale, getTranslations } from "next-intl/server";

import { EmblaCarousel } from "../carousel";
import NewItem from "../news/newItem";

import { getQuickNews } from "@/service/module/quick_news";

async function getQuickNewsList(limit: number) {
  const locale = await getLocale();
  const res = await getQuickNews({
    limit: limit,
    language: locale,
    category: "quick_news",
  });
  const data = res.data;

  return data;
}

export default async function Hero() {
  const news = await getQuickNewsList(50);
  const t = await getTranslations("QuickNews");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 w-full place-items-center lg:place-items-start">
      <div className="grid grid-cols-1  gap-4 border rounded-2xl  items-center overflow-hidden">
        <EmblaCarousel />
      </div>
      <div className="flex-col gap-4 border p-4 rounded-2xl hidden lg:flex">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl  lg:text-3xl font-extrabold italic">
            {t("sub-title")}
          </h2>
          <div className="h-[310px] space-y-4 overflow-y-auto">
            {news.map((item, index) => (
              <NewItem key={item.uuid} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

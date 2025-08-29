import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLocale, getTranslations } from "next-intl/server";
import { ScrollShadow } from "@heroui/scroll-shadow";

import NewItem from "./news/newItem";
import ViewMore from "./viewMore";

import { NewsResponse } from "@/types/news";
dayjs.extend(relativeTime);

async function getHotNews() {
  const locale = await getLocale();
  const res = await fetch(
    `http://38.60.91.19:3001/news?limit=30&language=${locale}&category=hot_news`
  );
  const data = (await res.json()) as NewsResponse;

  return data.data;
}

export const revalidate = 60;
export async function HowNews() {
  const t = await getTranslations("HotNews");
  const newsItems = await getHotNews();

  return (
    <section
      className="bg-default-50 p-8 w-full border rounded-2xl"
      id="hot-news"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-2xl lg:text-3xl font-extrabold italic text-foreground mb-2"
            id="quick-news"
          >
            {t("title")}{" "}
            <span className="text-default-500">({t("subtitle")})</span>
          </h2>
          <ViewMore type="hot-news" />
        </div>

        {/* News Grid */}
        <ScrollShadow className="space-y-4 h-[810px] overflow-y-auto">
          {newsItems.map((item, index) => (
            <NewItem key={item.uuid} data={item} index={index} />
          ))}
        </ScrollShadow>
      </div>
    </section>
  );
}

import ViewMore from "./viewMore";
import { NewsResponse } from "@/types/news";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import NewItem from "./news/newItem";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ScrollShadow } from "@heroui/scroll-shadow";

async function getQuickNewsList(limit: number) {
  const locale = await getLocale();
  const res = await fetch(
    `http://38.60.91.19:3001/news?limit=${limit}&language=${locale}`
  );
  const data = (await res.json()) as NewsResponse;
  return data.data;
}

export async function QuickNews({ limit = 30 }: { limit?: number }) {
  const t = await getTranslations("QuickNews");

  const newsItems = await getQuickNewsList(limit);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section
        id="news"
        className="w-full min-h-24 bg-default-50 p-8 border rounded-2xl"
      >
        <div className="container mx-auto ">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-2xl lg:text-3xl font-extrabold italic text-foreground "
              id="quick-news"
            >
              {t("title")}
            </h2>
            <ViewMore type="quick-news" />
          </div>

          <ScrollShadow className="space-y-4 h-[810px] overflow-y-auto">
            {newsItems.map((item, index) => (
              <NewItem data={item} index={index} key={item.uuid} />
            ))}
          </ScrollShadow>
        </div>
      </section>
    </Suspense>
  );
}

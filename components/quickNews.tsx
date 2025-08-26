import ViewMore from "./viewMore";
import { NewsResponse } from "@/types/news";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import NewItem from "./news/newItem";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";

async function getQuickNewsList() {
  const locale = await getLocale();
  const res = await fetch(
    `http://38.60.91.19:3001/news?limit=10&language=${locale}`
  );
  const data = (await res.json()) as NewsResponse;
  return data.data;
}

export async function QuickNews() {
  const t = await getTranslations("QuickNews");

  const newsItems = await getQuickNewsList();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section
        id="news"
        className="w-full min-h-24 bg-default-50 px-4 sm:px-6 lg:px-8 py-4 border rounded-2xl"
      >
        <div className="container mx-auto ">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-2xl font-bold text-foreground mb-2"
              id="quick-news"
            >
              {t("title")}
            </h2>
            <ViewMore type="quick-news" />
          </div>

          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <NewItem data={item} index={index} key={item.uuid} />
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
}

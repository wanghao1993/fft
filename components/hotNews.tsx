import ViewMore from "./viewMore";
import { NewsResponse } from "@/types/news";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLocale, getTranslations } from "next-intl/server";
import NewItem from "./news/newItem";
dayjs.extend(relativeTime);

async function getHotNews() {
  const locale = await getLocale();
  const res = await fetch(
    `http://38.60.91.19:3001/news?limit=10&language=${locale}&category=hot_news`
  );
  const data = (await res.json()) as NewsResponse;
  return data.data;
}

export async function HowNews() {
  const t = await getTranslations("HotNews");
  const newsItems = await getHotNews();

  return (
    <section
      id="hot-news"
      className="bg-default-50 px-4 sm:px-6 lg:px-8 py-4 w-full border rounded-2xl"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-2xl font-bold text-foreground mb-2"
            id="quick-news"
          >
            {t("title")}{" "}
            <span className="text-default-500">({t("subtitle")})</span>
          </h2>
          <ViewMore type="hot-news" />
        </div>

        {/* News Grid */}
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <NewItem data={item} index={index} key={item.uuid} />
          ))}
        </div>
      </div>
    </section>
  );
}

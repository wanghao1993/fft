import { getLocale, getTranslations } from "next-intl/server";

import { EmblaCarousel } from "../carousel";
import NewItem from "../news/newItem";

import { Blog, BlogRes } from "@/types/blog";
import { Link } from "@/i18n/navigation";
import { NewsResponse } from "@/types/news";

async function getOriginContent() {
  const res = await fetch("https://futurefrontier.ai/api/blog.php");
  const data = (await res.json()) as BlogRes;

  return data.items;
}

async function getQuickNewsList(limit: number) {
  const locale = await getLocale();
  const res = await fetch(
    `http://38.60.91.19:3001/news?limit=${limit}&language=${locale}&category=quick_news`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const data = (await res.json()) as NewsResponse;

  return data.data;
}

export default async function Hero() {
  const list = await getOriginContent();
  const news = await getQuickNewsList(50);
  const t = await getTranslations("QuickNews");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] my-6 lg:my-10 gap-4 w-full place-items-center lg:place-items-start">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 border rounded-2xl  items-center container overflow-hidden">
        <EmblaCarousel />
        <div className="py-5 block pr-4 lg:px-0 px-4 h-full">
          <div className="text-2xl font-bold italic">{t("mustread")}</div>
          <div className="font-semibold space-y-4">
            {list.map((item: Blog, index: number) => {
              return (
                <div
                  key={item.link}
                  className="line-clamp-1 hover:text-primary-400 hover:underline text-lg"
                >
                  <Link href={item.link} target="_blank">
                    {index + 1}. {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
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

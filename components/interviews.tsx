import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export async function Interviews() {
  const t = await getTranslations("Interviews");
  const locale = await getLocale();

  const list = [
    {
      id: 1,
      title: "专访赵长鹏：人生如牌局，唯有向前，如今更关注人才、时间与健康",
      link: "https://www.chaincatcher.com/article/2190073",
      language: "zh-CN",
    },
    {
      id: 2,
      title:
        "《财富》专访何一：从井边女孩到加密女王，亲述币安生死劫与她的首席客服哲学",
      link: "https://www.chaincatcher.com/article/2197651",
      language: "zh-CN",
    },
    {
      id: 3,
      title: "专访徐明星",
      link: "https://www.blocktempo.com/search/tag/%E5%BE%90%E6%98%8E%E6%98%9F/",
      language: "zh-CN",
    },
    {
      id: 4,
      title:
        "Tether CEO Says He'll Comply With GENIUS to Come to U.S., Circle Says It's Set Now",
      link: "https://www.coindesk.com/policy/2025/07/18/tether-ceo-says-he-ll-comply-with-genius-to-come-to-u-s-circle-says-it-s-set-now",
      language: "en",
    },
  ];

  const newsItems = list.filter((item) => item.language === locale);

  return (
    <section
      className="py-6 bg-default-50 w-full border rounded-2xl"
      id="interviews"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-2xl lg:text-3xl font-extrabold italic text-foreground mb-2"
            id="interviews"
          >
            {t("title")}
          </h2>
          {/* <ViewMore type="interviews" /> */}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6">
          {newsItems.map((item, index) => (
            <div key={item.id} className="w-full">
              <Link
                className="border-b w-full hover:text-primary"
                href={item.link}
                target="_blank"
              >
                {index + 1}. {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

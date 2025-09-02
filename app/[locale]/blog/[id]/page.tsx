import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";
import "./style.css";

import { addViewCount, getBlogById } from "@/service/module/carousel";
import { getHtml } from "@/utils/md";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Common");
  const data = await getBlogById(id);

  if (id) {
    // 增加浏览量
    addViewCount(id);
  }
  const content = await getHtml(data.content);

  return (
    <main className="flex flex-col gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
      <div className="container">
        <h1 className="font-bold text-2xl lg:text-3xl text-center">
          {data.title}
        </h1>
        <div className="flex justify-center items-center gap-5 mt-4">
          {/* <div>{data.tag}</div> */}
          <div>
            {t("publishedAt")}:
            {dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")}
          </div>
          <div>
            {t("viewCount")}: {data.viewCount}
          </div>
        </div>
        <article className="text-foreground/80 leading-7" id="article-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </main>
  );
}

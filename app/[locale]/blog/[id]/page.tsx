import dayjs from "dayjs";
// eslint-disable-next-line import/order
import { getTranslations } from "next-intl/server";
import "./style.css";
import Image from "next/image";
import { Chip } from "@heroui/chip";
import { addViewCount, getBlogById } from "@/service/module/carousel";
import { getHtml } from "@/utils/md";
import { Link } from "@/i18n/navigation";
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
      <h1 className="font-bold text-2xl lg:text-3xl text-center">
        {data.title}
      </h1>
      <div className="flex justify-center items-center gap-5 mt-4">
        <div>
          {data.tags.map((tag) => (
            <Link key={tag.id} href={`/search?keyword=${tag.name}`}>
              <Chip color="default" variant="flat">
                {tag.name}
              </Chip>
            </Link>
          ))}
        </div>
        <div>
          {t("publishedAt")}:{dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")}
        </div>
        <div>
          {t("viewCount")}: {data.viewCount}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Image alt={data.title} height={1000} src={data.cover} width={680} />
      </div>
      <article className="text-foreground/80 leading-7" id="article-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  );
}

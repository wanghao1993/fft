import { getTranslations } from "next-intl/server";
import { Chip } from "@heroui/chip";

import Share from "@/components/share";
import { DateFormat } from "@/components/date.format";
import { getNewsById } from "@/service/module/quick_news";
import { Link } from "@/i18n/navigation";
import "./style.css";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const data = await getNewsById(id);

  return {
    title: data.title,
    description: data.summary,
    content: data.content,
  };
}

async function getData(id: string) {
  const res = await getNewsById(id);

  return res;
}

export default async function News({ params }: Props) {
  const { id } = await params;
  const data = await getData(id);
  const t = await getTranslations("Common");

  return (
    <div className="py-8 px-6 lg:px-8">
      <h1 className="text-2xl font-bold mt-8">{data.title}</h1>
      <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
        <span>
          {t("publishedAt")}: {DateFormat({ date: data.publishedAt })}
        </span>
      </p>
      <div className="flex items-center gap-2 mt-4">
        {data.tags.map((tag) => (
          <Link key={tag.id} href={`/search?keyword=${tag.name}`}>
            <Chip color="default" variant="flat">
              {tag.name}
            </Chip>
          </Link>
        ))}
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: data.content || data.summary }}
        className="mt-4 content"
      />

      <div className="mt-10 flex items-center gap-8">
        {data.source !== "Future Frontier" ? (
          <Link
            className="text-sm text-gray-500"
            href={data.link}
            target="_blank"
          >
            {t("source")}: {data.source}
          </Link>
        ) : (
          <span className="text-sm text-gray-500">
            {t("source")}: {data.source}
          </span>
        )}

        <Share canShare={!data.content} data={data} />
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { News as NewsType } from "@/types/news";
import Share from "@/components/share";
import { DateFormat } from "@/components/date.format";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const data = await getData(id);

  return {
    title: data.title,
    description: data.summary,
  };
}

async function getData(id: string) {
  return await fetch(`http://38.60.91.19:3001/news/${id}`).then((res) =>
    res.json()
  );
}

export default async function News({ params }: Props) {
  const { id } = await params;
  const data: NewsType = await getData(id);
  const t = await getTranslations("Common");

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
        <span>
          {t("publishedAt")}: {DateFormat({ date: data.publishedAt })}
        </span>
      </p>
      <p className="mt-4">{data.summary}</p>

      <div className="mt-10 flex items-center gap-8">
        <Link
          className="text-sm text-gray-500"
          href={data.link}
          target="_blank"
        >
          {t("source")}: {data.source}
        </Link>
        <Share data={data} />
      </div>
    </div>
  );
}

import type { News } from "@/types/news";

import { getTranslations } from "next-intl/server";
import Link from "next/link";

import Share from "@/components/share";
import { DateFormat } from "@/components/date.format";
import { getNewsById } from "@/service/module/quick_news";

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
    <>
      <h1 className="text-2xl font-bold mt-8">{data.title}</h1>
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
    </>
  );
}

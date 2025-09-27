import type { News } from "@/types/news";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import { getLocale } from "next-intl/server";

import { DateFormatFromNow } from "../date.format";

import { Link } from "@/i18n/navigation";

dayjs.extend(relativeTime);

export default async function NewItem({ data }: { data: News; index: number }) {
  const locale = await getLocale();

  return (
    <div className="flex items-baseline gap-2 space-y-8">
      <div className="w-3 flex items-center justify-center">
        <span className="bg-primary size-1.5 rounded-full " />
      </div>
      <div>
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <span>{DateFormatFromNow(data.publishedAt, locale)}</span>
        </div>
        <Link
          className="hover:text-primary font-medium line-clamp-1"
          href={`/news/${data.uuid}?type=${data.category}`}
        >
          {data.title}
        </Link>
      </div>
    </div>
  );
}

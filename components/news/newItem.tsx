import { Link } from "@/i18n/navigation";
import { News } from "@/types/news";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import { DateFormatFromNow } from "../date.format";
dayjs.extend(relativeTime);

export default async function NewItem({ data }: { data: News; index: number }) {
  return (
    <div className="flex items-baseline gap-2 space-y-8">
      <span className=" bg-red-400 size-1.5 rounded-full " />
      <div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>{await DateFormatFromNow(data.publishedAt)}</span>

          {/* <Share data={data} /> */}
        </div>
        <Link
          className="hover:text-primary font-medium line-clamp-1"
          href={`/news/${data.uuid}`}
        >
          {data.title}
        </Link>
      </div>
    </div>
  );
}

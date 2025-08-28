import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import { getLocale } from "next-intl/server";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export async function DateFormatFromNow(date: number) {
  const locale = await getLocale();

  return dayjs(date * 1000)
    .locale(locale)
    .tz("Asia/Shanghai")
    .fromNow();
}

export async function DateFormat({ date }: { date: number }) {
  const locale = await getLocale();

  return dayjs(date * 1000)
    .locale(locale)
    .tz("Asia/Shanghai")
    .format("YYYY-MM-DD HH:mm:ss");
}

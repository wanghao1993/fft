"use client";

import { usePathname } from "@/i18n/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import QuickNewsList from "@/components/quickNewsList";
import HotNewList from "@/components/hotNewsList";

dayjs.extend(relativeTime);

export default function SubPage() {
  const path = usePathname();

  return (
    <div className="mt-20">
      {path === "/quick-news" && <QuickNewsList />}
      {path === "/hot-news" && <HotNewList />}
    </div>
  );
}

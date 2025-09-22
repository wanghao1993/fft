"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { usePathname } from "@/i18n/navigation";
import QuickNewsList from "@/components/quickNewsList";
import HotNewList from "@/components/hotNewsList";
import { Videos } from "@/components/videos";
import { PodCastsList } from "@/components/podcastList";

dayjs.extend(relativeTime);

export default function SubPage() {
  const path = usePathname();

  return (
    <main className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
      {path === "/quick-news" && <QuickNewsList />}
      {path === "/hot-news" && <HotNewList />}
      {(path === "/podcasts" || path === "/videos") && <Videos />}
      {(path === "/podcasts" || path === "/videos") && <PodCastsList />}
    </main>
  );
}

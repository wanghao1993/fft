"use client";
import { Tabs, Tab } from "@heroui/tabs";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Link from "next/dist/client/link";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

import { Meta, News } from "@/types/news";
import { getQuickNews } from "@/service/module/quick_news";
import Share from "@/components/share";
import { getVideos } from "@/service/module/videos";
import { Video } from "@/types/videos";
import { VideoItem } from "@/components/videoItem";
import { getBlogs } from "@/service/module/carousel";
export default function SearchPage() {
  const t = useTranslations("Site.navItems");
  const tc = useTranslations("Common");
  const params = useSearchParams();

  const keyword = params.get("keywords");

  const [preKeyword, setPreKeyword] = useState("");
  const locale = useLocale();
  // 快讯
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPage, setNewPage] = useState<Meta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: true,
    hasPrev: false,
  });

  // 新闻

  const [hotNewsList, setHotNewsList] = useState<News[]>([]);
  const [hotNewsPage, setHotNewsPage] = useState<Meta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: true,
    hasPrev: false,
  });

  const getNewsList = (page: number, reset?: boolean) => {
    setLoading(true);
    getQuickNews({
      language: locale,
      keyword: keyword || "",
      page: page,
      category: "quick_news",
      limit: 20,
    })
      .then((res) => {
        if (reset) {
          setNewsList([...res.data]);
        } else {
          setNewsList([...newsList, ...res.data]);
        }
        setNewPage(res.meta);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [newLoading, setNewLoading] = useState(false);
  const getHowNewsList = (page: number, reset?: boolean) => {
    setNewLoading(true);
    getQuickNews({
      language: locale,
      keyword: keyword || "",
      page: page,
      category: "hot_news",
      limit: 20,
    })
      .then((res) => {
        if (reset) {
          setHotNewsList([...res.data]);
        } else {
          setHotNewsList([...hotNewsList, ...res.data]);
        }
        setHotNewsPage(res.meta);
      })
      .finally(() => {
        setNewLoading(false);
      });
  };

  const [videoLoading, setVideoLoading] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [videoPage, setVideoPage] = useState<Meta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: true,
    hasPrev: false,
  });
  const getVideoList = (page: number, reset?: boolean) => {
    setVideoLoading(true);
    getVideos({
      title: keyword || "",
      page: page,
      limit: 12,
      language: locale,
    })
      .then((res) => {
        if (reset) {
          setVideoList([...res.data]);
        } else {
          setVideoList([...videoList, ...res.data]);
        }
        setVideoPage(res.meta);
      })
      .finally(() => {
        setVideoLoading(false);
      });
  };

  //   const [deepList, setDeepList] = useState<Blog[]>([]);
  //   const [deepPage, setDeepPage] = useState<Meta>({
  //     page: 1,
  //     limit: 20,
  //     total: 0,
  //     totalPages: 0,
  //     hasNext: true,
  //     hasPrev: false,
  //   });
  //   const getDeepList = (page: number) => {
  //     getBlogs({
  //       category: "deep",
  //       page: page,
  //         limit: 20,
  //         language: locale,
  //       })
  //     .then((res) => {
  //       setDeepList([...deepList, ...res.data]);
  //       setDeepPage(res.meta);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   };

  const getData = (reset?: boolean) => {
    getNewsList(newPage.page, reset);
    getHowNewsList(hotNewsPage.page, reset);
    getVideoList(videoPage.page, reset);
  };

  const resetData = () => {
    setNewsList([]);
    setHotNewsList([]);
    setVideoList([]);
    setNewPage({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: true,
      hasPrev: false,
    });
    setHotNewsPage({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: true,
      hasPrev: false,
    });
    setVideoPage({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: true,
      hasPrev: false,
    });
  };

  useEffect(() => {
    if (preKeyword === keyword) return;
    else {
      resetData();
      setTimeout(() => {
        getData(true);
        setPreKeyword(keyword || "");
      }, 1000);
    }
  }, [keyword, preKeyword]);

  return (
    <main className="flex flex-col gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
      <Tabs aria-label="Options">
        <Tab key="quick_news" title={t("quickNews")}>
          {newsList.map((item) => (
            <motion.div
              key={item.uuid}
              className="border-b py-2 border-b-gray-200 grid grid-cols-[120px_1fr]"
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div>
                {dayjs(item.publishedAt * 1000).format("YYYY-MM-DD HH:mm")}
              </div>

              <div>
                <Link
                  className="text-primary  font-semibold"
                  href={`news/${item.uuid}`}
                  target="_blank"
                >
                  {item.title}
                </Link>
                <div
                  className="text-default-400 line-clamp-2"
                  style={{
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.summary}
                </div>

                <div className="flex justify-between">
                  <div className="space-x-4">
                    {item.tags.map((tag) => (
                      <Chip key={tag.id} color="default" size="sm">
                        {tag.name}
                      </Chip>
                    ))}
                  </div>
                  <Share data={item} />
                </div>
              </div>
            </motion.div>
          ))}
          <div>
            {newPage.hasNext && !loading && (
              <div className="mt-4 text-center">
                <Button onPress={() => getNewsList(newPage.page + 1)}>
                  {tc("loadMore")}
                </Button>
              </div>
            )}
            {loading && (
              <div className="mt-4 text-center">
                <Spinner />
              </div>
            )}
          </div>

          {newsList.length === 0 && !loading && (
            <div className="mt-4 text-center">
              <span className="text-default-400">{tc("noData")}</span>
            </div>
          )}
        </Tab>
        <Tab key="hot_news" title={t("hotNews")}>
          {hotNewsList.map((item) => (
            <motion.div
              key={item.uuid}
              className="border-b py-2 border-b-gray-200 grid grid-cols-[120px_1fr]"
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div>
                {dayjs(item.publishedAt * 1000).format("YYYY-MM-DD HH:mm")}
              </div>

              <div>
                <Link
                  className="text-primary  font-semibold"
                  href={`news/${item.uuid}`}
                  target="_blank"
                >
                  {item.title}
                </Link>
                <div
                  className="text-default-400 line-clamp-2"
                  style={{
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.summary}
                </div>

                <div className="flex justify-between">
                  <div className="space-x-4">
                    {item.tags.map((tag) => (
                      <Chip key={tag.id} color="default" size="sm">
                        {tag.name}
                      </Chip>
                    ))}
                  </div>
                  <Share data={item} />
                </div>
              </div>
            </motion.div>
          ))}
          <div>
            {hotNewsPage.hasNext && !newLoading && (
              <div className="mt-4 text-center">
                <Button onPress={() => getHowNewsList(hotNewsPage.page + 1)}>
                  {tc("loadMore")}
                </Button>
              </div>
            )}
            {loading && (
              <div className="mt-4 text-center">
                <Spinner />
              </div>
            )}
          </div>

          {hotNewsList.length === 0 && !newLoading && (
            <div className="mt-4 text-center">
              <span className="text-default-400">{tc("noData")}</span>
            </div>
          )}
        </Tab>
        {/* <Tab key="deep" title={t("deep")}>
          <div>22</div>
        </Tab> */}
        <Tab key="videos" title={t("videos")}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoList.map((item) => (
              <VideoItem key={item.uuid} locale={locale} video={item} />
            ))}
          </div>

          {videoList.length === 0 && !videoLoading && (
            <div className="mt-4 text-center">
              <span className="text-default-400">{tc("noData")}</span>
            </div>
          )}
          <div>
            {videoPage.hasNext && !videoLoading && (
              <div className="mt-4 text-center">
                <Button onPress={() => getVideoList(videoPage.page + 1)}>
                  {tc("loadMore")}
                </Button>
              </div>
            )}
            {videoLoading && (
              <div className="mt-4 text-center">
                <Spinner />
              </div>
            )}
          </div>
        </Tab>
      </Tabs>
    </main>
  );
}

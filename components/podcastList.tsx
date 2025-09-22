"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";

import { AudioItem } from "./audioItem";

import { getPodcast } from "@/service/module/podcast";
import { Podcast } from "@/types/podcast";

dayjs.extend(relativeTime);

export function PodCastsList() {
  const locale = useLocale();

  const t = useTranslations("Common");
  const [audios, setAudios] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getList = () => {
    setLoading(true);
    getPodcast({
      limit: 12,
      page,
      language: locale,
    }).then((res) => {
      setAudios(res.data);
      setHasMore(res.hasMore);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!hasMore) return;
    getList();
  }, [locale, page]);

  return (
    <div>
      <div className="grid grid-cols-1  overflow-auto gap-6">
        {audios.map((audio) => (
          <div key={audio.id}>
            <AudioItem locale={locale} podcast={audio} />
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}

      <div className="flex justify-center py-8">
        {hasMore && !loading && (
          <Button
            color="primary"
            isDisabled={!hasMore}
            onPress={() => {
              setPage(page + 1);
            }}
          >
            {t("loadMore")}
          </Button>
        )}
      </div>
    </div>
  );
}

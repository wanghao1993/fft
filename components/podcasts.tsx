import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLocale, getTranslations } from "next-intl/server";

import ViewMore from "./viewMore";
import { VideoItem } from "./videoItem";

import { getVideos } from "@/service/module/videos";

dayjs.extend(relativeTime);

async function getPoadcasts(limit: number, locale: string) {
  const res = await getVideos({
    limit: limit,
    language: locale,
    category: "podcast",
  });

  return res.data;
}
export async function PodCasts() {
  const locale = await getLocale();

  const t = await getTranslations("Podcasts");
  const videos = await getPoadcasts(12, locale);

  return (
    <section
      className="py-8 bg-default-50 w-full border rounded-2xl"
      id="podcasts"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl  font-extrabold italic text-foreground">
            {t("title")}
          </h2>
          <ViewMore type="podcasts" />
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.uuid}>
              <VideoItem locale={locale} video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

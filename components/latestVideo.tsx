import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Play, Clock } from "lucide-react";

import ViewMore from "./viewMore";
import { VideoResponse } from "@/types/videos";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
dayjs.extend(relativeTime);
async function getPoadcasts(limit: number) {
  const locale = await getLocale();
  const res = await fetch(
    `http://38.60.91.19:3001/videos?limit=${limit}&language=${locale}&category=podcast`
  );
  const data = (await res.json()) as VideoResponse;
  return data.data;
}
export async function LatestVideos() {
  const t = await getTranslations("Videos");
  const videos = await getPoadcasts(9);

  return (
    <section
      className="py-8 bg-default-50 w-full border rounded-2xl"
      id="videos"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold italic text-foreground">
            {t("title")}
          </h2>
          <ViewMore type="videos" />
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div key={video.uuid}>
              <Link href={video.link} target="_blank">
                <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="w-full h-48 object-cover"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        isIconOnly
                        color="primary"
                        size="lg"
                        className="rounded-full w-16 h-16"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {/* {video.duration} */}
                    </div>

                    {/* Platform Badge */}
                    <Chip
                      color="danger"
                      className="absolute top-2 left-2"
                      size="sm"
                    >
                      {video.channel}
                    </Chip>
                  </div>

                  <CardBody className="p-4">
                    <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    {/* <p className="text-sm text-default-500 mb-3">
                  {video}
                </p> */}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-default-500">
                        <span>{video.source}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-default-500">
                        <Clock className="h-3 w-3" />
                        <span>{dayjs(video.publishedAt * 1000).fromNow()}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

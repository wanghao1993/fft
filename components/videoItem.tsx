import type { Video } from "@/types/videos";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Clock, Play } from "lucide-react";

import { DateFormatFromNow } from "./date.format";

import { Link } from "@/i18n/navigation";

export function VideoItem({ video, locale }: { video: Video; locale: string }) {
  return (
    <Link href={video.link} target="_blank">
      <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Thumbnail */}
        <div className="relative">
          <img
            alt={video.title}
            className="object-cover w-full aspect-video"
            src={video.thumbnail}
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              isIconOnly
              className="rounded-full w-16 h-16"
              color="primary"
              size="lg"
            >
              <Play className="h-6 w-6 ml-1" />
            </Button>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
            {video.time}
          </div>

          {/* Platform Badge */}
          <Chip className="absolute top-2 left-2" color="danger" size="sm">
            {video.channel}
          </Chip>
        </div>

        <CardBody className="p-4">
          <h3 className="font-medium text-sm text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
              <span>{DateFormatFromNow(video.publishedAt, locale)}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

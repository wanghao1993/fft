"use client";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Send } from "lucide-react";
import Image from "next/image";

import { handleShare } from "@/utils/share";
import { News } from "@/types/news";
export default function Share({ data }: { data: News }) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="分享到 Twitter">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={(e) => {
            handleShare(
              "twitter",
              data.title,
              `${window.location.origin}/news/${data.uuid}`,
            );
          }}
        >
          <Image alt="twitter" height={12} src={"/images/x.svg"} width={12} />
        </Button>
      </Tooltip>

      <Tooltip content="分享到 Telegram">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={(e) => {
            handleShare(
              "telegram",
              data.title,
              `${window.location.origin}/news/${data.uuid}`,
            );
          }}
        >
          <Send className="h-3 w-3" />
        </Button>
      </Tooltip>
    </div>
  );
}

"use client";
import { News } from "@/types/news";
import { handleShare } from "@/utils/share";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Send } from "lucide-react";
import Image from "next/image";
export default function Share({ data }: { data: News }) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="分享到 Twitter">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={(e) => {
            handleShare(
              "twitter",
              data.title,
              `${window.location.origin}/news/${data.uuid}`
            );
          }}
        >
          <Image src={"/images/x.svg"} width={12} height={12} alt="twitter" />
        </Button>
      </Tooltip>

      <Tooltip content="分享到 Telegram">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={(e) => {
            handleShare(
              "telegram",
              data.title,
              `${window.location.origin}/news/${data.uuid}`
            );
          }}
        >
          <Send className="h-3 w-3" />
        </Button>
      </Tooltip>
    </div>
  );
}

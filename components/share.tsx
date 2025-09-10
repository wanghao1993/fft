"use client";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Image as ImageIcon, Send } from "lucide-react";
import Image from "next/image";
import { addToast, closeToast } from "@heroui/toast";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";

import { handleShare } from "@/utils/share";
import { News } from "@/types/news";
import { getNewsShareImage } from "@/service/module/quick_news";
import { useTranslations } from "next-intl";

export default function Share({ data }: { data: News }) {
  const [loading, setIsLoading] = useState(false);
  const t = useTranslations("Common");
  const handleDownloadImage = async () => {
    if (loading) return;
    try {
      setIsLoading(true);
      addToast({
        title: t("downloadImageLoading"),
        color: "primary",
        loadingComponent: <Spinner />,
      });
      const blob = await getNewsShareImage({ uuid: data.uuid });

      // 创建下载链接
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${data.title}-分享图片.png`;

      // 触发下载
      document.body.appendChild(link);
      link.click();

      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      addToast({
        title: "下载图片成功",
        color: "success",
      });
    } catch (error: any) {
      setIsLoading(false);
      closeToast("download-image");
      addToast({
        title: "下载图片失败",
        description: error.message,
        color: "danger",
      });
      // 这里可以添加错误提示，比如使用 toast 组件
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip content="分享到 Twitter">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => {
            handleShare(
              "twitter",
              data.title,
              `${window.location.origin}/news/${data.uuid}`
            );
          }}
        >
          <Image alt="twitter" height={16} src={"/images/x.svg"} width={16} />
        </Button>
      </Tooltip>

      <Tooltip content="分享到 Telegram">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => {
            handleShare(
              "telegram",
              data.title,
              `${window.location.origin}/news/${data.uuid}`
            );
          }}
        >
          <Send className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content="下载分享图片">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={handleDownloadImage}
        >
          <ImageIcon className="size-4" />
        </Button>
      </Tooltip>
    </div>
  );
}

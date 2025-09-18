"use client";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Image as ImageIcon, Send } from "lucide-react";
import Image from "next/image";
import { addToast, closeToast } from "@heroui/toast";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

import ShareBg from "./../public/images/logo.png";
import ShareQrcode from "./../public/images/qrcode.png";
import { TwitterIcon } from "./icons";

import { handleShare } from "@/utils/share";
import { News } from "@/types/news";
import { getNewsShareImage } from "@/service/module/quick_news";

export default function Share({
  data,
  canShare,
}: {
  data: News;
  canShare?: boolean;
}) {
  const [loading, setIsLoading] = useState(false);
  const t = useTranslations("Common");
  const params = useSearchParams();

  const type = params.get("type");
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
      link.download = `${data.title}.png`;

      // 触发下载
      document.body.appendChild(link);
      link.click();

      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      addToast({
        title: t("downLoadImageSuccess"),
        color: "success",
      });
    } catch (error: any) {
      setIsLoading(false);
      closeToast("download-image");
      addToast({
        title: t("downLoadImageFailed"),
        description: error.message,
        color: "danger",
      });
      // 这里可以添加错误提示，比如使用 toast 组件
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip content={t("shareToTwitter")}>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => {
            handleShare(
              "twitter",
              data.title,
              `${window.location.origin}/news/${data.uuid}?type=${type}`
            );
          }}
        >
          <TwitterIcon className="size-4" />
        </Button>
      </Tooltip>

      <Tooltip content={t("shareToTelegram")}>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => {
            handleShare(
              "telegram",
              data.title,
              `${window.location.origin}/news/${data.uuid}?type=${type}`
            );
          }}
        >
          <Send className="size-4" />
        </Button>
      </Tooltip>

      {canShare && (
        <Tooltip
          content={
            <div className="w-[400px] flex flex-col">
              <Image alt="share" src={ShareBg} width={400} />
              <div className="bg-[#005d18] py-4">
                <div className="bg-white rounded-lg px-3 py-2 w-92/100 mx-auto flex flex-col gap-1">
                  <div className="font-bold text-lg flex">{data.title}</div>

                  <div className="text-sm  text-gray-500">
                    {dayjs(data.publishedAt * 1000).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.summary }}
                    className="text-sm text-black line-clamp-4 mb-2"
                  />
                </div>
              </div>
              <div className="bg-[#005d18] py-4 flex items-center justify-between gap-2 p-4">
                <span className="text-white">{}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">{t("scanToReadMore")}</span>
                  <Image alt="share" src={ShareQrcode} width={60} />
                </div>
              </div>
              <Button
                isIconOnly
                className="w-full mt-3"
                color="primary"
                onPress={handleDownloadImage}
              >
                {t("downLoadImage")}
              </Button>
            </div>
          }
        >
          <Button isIconOnly size="sm" variant="light">
            <ImageIcon className="size-4" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}

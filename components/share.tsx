"use client";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Image as ImageIcon, Send } from "lucide-react";
import Image from "next/image";
import { addToast, closeToast } from "@heroui/toast";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas-pro";

import ShareBg from "./../public/images/logo.png";
import ShareQrcode from "./../public/images/qrcode.png";
import { TwitterIcon } from "./icons";

import { handleShare } from "@/utils/share";
import { News } from "@/types/news";

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
  const shareImageRef = useRef<HTMLDivElement>(null);

  const type = params.get("type");
  const handleDownloadImage = async () => {
    if (loading || !shareImageRef.current) return;
    try {
      setIsLoading(true);
      // addToast({
      //   title: t("downloadImageLoading"),
      //   color: "primary",
      //   loadingComponent: <Spinner />,
      // });

      // 使用 html2canvas 截图
      const canvas = await html2canvas(shareImageRef.current, {
        backgroundColor: null,
        scale: 2, // 提高图片质量
        useCORS: true,
        allowTaint: true,
      });

      // 转换为 blob
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
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
        }
      }, "image/png");

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      closeToast("download-image");
      addToast({
        title: t("downLoadImageFailed"),
        description: error.message,
        color: "danger",
      });
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
            <>
              <Button
                isIconOnly
                className="w-full mb-4"
                color="primary"
                isLoading={loading}
                size="md"
                onPress={handleDownloadImage}
              >
                {t("downLoadImage")}
              </Button>
              <div ref={shareImageRef} className="w-[400px] flex flex-col">
                <div className="bg-[#009845] flex justify-center">
                  <div className="bg-[#015c19] rounded-2xl w-[360px] mt-12 flex flex-col">
                    <Image
                      alt="share"
                      className="rounded-t-2xl object-cover"
                      height={200}
                      src={ShareBg}
                      width={360}
                    />
                    <div className="bg-[#015c19] pb-4 ">
                      <div className="bg-white rounded-lg -mt-1 px-3 py-2 w-92/100 mx-auto flex flex-col gap-1">
                        <div className="font-bold text-lg flex">
                          {data.title}
                        </div>

                        <div className="text-sm  text-gray-500">
                          {dayjs(data.publishedAt * 1000).format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: data.content }}
                          className="text-sm text-black mb-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#015c19]  py-4 flex items-center justify-between gap-2 p-4">
                  <span className="text-white">{}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{t("scanToReadMore")}</span>
                    <Image alt="share" src={ShareQrcode} width={60} />
                  </div>
                </div>
              </div>
            </>
          }
        >
          <ImageIcon className="size-4" />
        </Tooltip>
      )}
    </div>
  );
}

import { getTranslations } from "next-intl/server";

import { getSocials } from "@/service/module/social";

export default async function ContactUs() {
  const t = await getTranslations("ContactUs");
  const list = await getSocials();
  const isActiveList = list.filter((item) => item.isActive);
  const email = isActiveList.find((item) => item.platform === "email");
  const tg = isActiveList.find((item) => item.platform === "telegram");
  const wechat = isActiveList.find((item) => item.platform === "wechat");

  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center ">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
        <div className="text-center">{t("subtitle")}</div>
        <div>Email: {email?.url}</div>
        {tg && <div>TG: {tg?.url}</div>}
        {wechat && <div>WeChat: {wechat?.url}</div>}
      </div>
    </div>
  );
}

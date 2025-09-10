import { useTranslations } from "next-intl";

export default function ContactUs() {
  const t = useTranslations("ContactUs");

  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center ">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
        <div className="text-center">{t("subtitle")}</div>
        <div>请联系 TG: colinwu1989 或 微信: ipo19841984</div>
      </div>
    </div>
  );
}

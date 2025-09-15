import { getAbout } from "@/service/module/about";

import "./style.css";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Future Frontier（梵境传媒）是一家总部位于香港、面向全球的Web3品牌战略与内容传播机构。我们致力于连接新兴数字金融与文化叙事，为加密行业提供前沿的内容生产、媒体策略、品牌建设与战略顾问服务。",
};

export default async function AboutUs() {
  const locale = await getLocale();
  const about = await getAbout(locale);

  return (
    <main className="py-6 lg:py-10 space-y-8" id="about">
      {about.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]  max-w-6xl items-center justify-center mx-auto p-8  rounded-2xl"
        >
          <h2 className="font-bold text-3xl text-center">{item.module}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="leading-relaxed text-foreground/70 mt-4 lg:border-l pl-8 border-gray-300 text-sm lg:text-left"
          />
        </div>
      ))}
    </main>
  );
}

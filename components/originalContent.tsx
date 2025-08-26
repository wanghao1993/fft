import { User, ArrowRight } from "lucide-react";
import Link from "next/link";

import { getTranslations } from "next-intl/server";
import { BlogRes } from "@/types/blog";

async function getOriginContent() {
  const res = await fetch("https://futurefrontier.ai/api/blog.php");
  const data = (await res.json()) as BlogRes;
  return data.items;
}

export async function OriginalContent() {
  const t = await getTranslations("Deep");

  const articles = await getOriginContent();

  return (
    <section
      className="bg-background w-full border rounded-2xl p-8"
      id="in-depth"
    >
      <div className="container mx-auto ">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold italic text-foreground">
            {t("title")}
          </h2>
          {/* <ViewMore type="in-depth" /> */}
        </div>

        {/* Featured Article */}
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div
              key={article.link}
              className="border-b pb-4 border-dotted space-y-2"
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              <p className="text-default-500 line-clamp-3">{article.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-default-500">
                    <User className="h-4 w-4" />
                    <span>Future Frontier</span>
                  </div>
                  <span className="text-default-500">·</span>
                  <span className="text-sm text-default-500">2天前</span>
                </div>

                <Link href={article.link} target="_blank">
                  <span className="group/btn flex items-center gap-2 text-primary font-semibold">
                    {t("readAll")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

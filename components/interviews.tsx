import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getInterviews } from "@/service/module/interview";

export async function Interviews() {
  const t = await getTranslations("Interviews");
  const locale = await getLocale();

  const interviews = await getInterviews(locale);

  return (
    <section className="py-6  w-full border rounded-2xl" id="interviews">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-2xl lg:text-3xl font-extrabold italic text-foreground mb-2"
            id="interviews"
          >
            {t("title")}
          </h2>
          {/* <ViewMore type="interviews" /> */}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6">
          {interviews.map((item, index) => (
            <div key={item.id} className="w-full">
              <Link
                className="border-b w-full hover:text-primary"
                href={item.url}
                target="_blank"
              >
                {index + 1}. {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

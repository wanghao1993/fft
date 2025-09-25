import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLocale, getTranslations } from "next-intl/server";

import ViewMore from "./viewMore";
import { AudioItem } from "./audioItem";

import { getPodcast } from "@/service/module/podcast";

dayjs.extend(relativeTime);

async function getPoadcasts(limit: number, locale: string) {
  const res = await getPodcast({
    limit: limit,
    page: 1,
    language: locale,
  });

  return res.data;
}
export async function PodCasts() {
  const locale = await getLocale();

  const t = await getTranslations("Podcasts");
  const audios = await getPoadcasts(12, locale);

  return (
    <section
      className="py-8 w-full border border-primary rounded-2xl"
      id="podcasts"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl  font-extrabold italic text-primary">
            {t("title")}
          </h2>
          <ViewMore type="podcasts" />
        </div>
        <div className="grid grid-cols-1 h-[720px] overflow-auto gap-6">
          {audios.map((audio) => (
            <div key={audio.id}>
              <AudioItem locale={locale} podcast={audio} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

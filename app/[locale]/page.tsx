import Hero from "@/components/hero";
import { QuickNews } from "@/components/quickNews";
import { LatestVideos } from "@/components/latestVideo";
import { OriginalContent } from "@/components/originalContent";
import { Services } from "@/components/our-services";
import Partners from "@/components/partners";
import Tags from "@/components/tags";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { getLocalizedSiteConfig } from "@/config/site";
import { HowNews } from "@/components/hotNews";
import { PodCasts } from "@/components/podcasts";
import { Interviews } from "@/components/interviews";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Tags包装器组件，用于提供国际化配置
async function TagsWrapper() {
  const siteConfig = await getLocalizedSiteConfig();
  return (
    <Tags
      tags={siteConfig.extendedTags}
      categories={siteConfig.categories}
      uiText={{
        filtering: siteConfig.uiText?.filtering || "筛选中:",
        more: siteConfig.uiText?.more || "更多",
      }}
    />
  );
}

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <main className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10">
      <Hero />
      {/* <TagsWrapper /> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <QuickNews />
        <HowNews />
      </div>
      <OriginalContent />
      <PodCasts />
      <LatestVideos />
      <Interviews />
      <Services />
      <Partners />
    </main>
  );
}

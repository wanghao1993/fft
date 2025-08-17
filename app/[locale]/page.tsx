import Hero from "@/components/hero";
import { LatestNews } from "@/components/lastestNew";
import { LatestVideos } from "@/components/latestVideo";
import { OriginalContent } from "@/components/originalContent";
import { Services } from "@/components/our-services";
import Partners from "@/components/partners";
import Tags from "@/components/tags";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
      <Tags />
      <LatestNews />
      <LatestVideos />
      <OriginalContent />
      <Services />
      <Partners />
    </main>
  );
}

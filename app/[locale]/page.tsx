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
    <main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      content
    </main>
  );
}

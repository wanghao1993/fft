import { EmblaCarousel } from "../carousel";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("Hero");
  return (
    <section className="relative w-full">
      <div className="text-center max-w-4xl mx-auto">
        <div className="hidden md:flex md:flex-start">
          <EmblaCarousel />
        </div>

        <h1 className="text-3xl font-bold mt-12">{t("title")}</h1>
      </div>
    </section>
  );
}

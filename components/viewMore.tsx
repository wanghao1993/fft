import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@heroui/button";
import { useLocale, useTranslations } from "next-intl";

export default function ViewMore({
  type,
}: {
  type:
    | "quick-news"
    | "hot-news"
    | "in-depth"
    | "podcasts"
    | "videos"
    | "interviews";
  category?: string;
}) {
  const tc = useTranslations("Common");

  return (
    <Link href={type}>
      <Button variant="bordered" size="sm">
        {tc("viewMore")}
      </Button>
    </Link>
  );
}

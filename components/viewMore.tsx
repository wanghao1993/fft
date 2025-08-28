import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

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
      <Button size="sm" variant="bordered">
        {tc("viewMore")}
      </Button>
    </Link>
  );
}

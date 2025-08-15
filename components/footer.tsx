import { Link } from "@/i18n/navigation";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        target="_blank"
        className="flex items-center gap-1 text-current"
        href="https://heroui.com?utm_source=next-app-template"
        title="heroui.com homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">HeroUI</p>
      </Link>
    </footer>
  );
}

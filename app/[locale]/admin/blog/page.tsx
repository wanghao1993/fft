import { Link } from "@/i18n/navigation";

export default function AdminBlogPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex gap-4">
        <Link href={"blog/list"}>博客列表</Link>
        <Link href={"blog/write"}>寫作</Link>
        <Link href={"/admin/tag"}>標籤管理</Link>
      </div>
    </main>
  );
}

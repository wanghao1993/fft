import { Link } from "@/i18n/navigation";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function AdminBlogPage() {
  const data = [
    {
      title: "博客",
      description: "管理所有博客文章",
      href: "admin/blog/list",
    },
    {
      title: "视频",
      description: "管理所有视频",
      href: "admin/video",
    },
    {
      title: "视频来源",
      description: "管理所有视频来源",
      href: "admin/video-resource",
    },
    {
      title: "新闻/快讯",
      description: "管理所有新闻/快讯",
      href: "admin/news",
    },
    {
      title: "新闻来源",
      description: "管理所有新闻来源",
      href: "admin/news-resource",
    },
    {
      title: "标签",
      description: "管理所有标签",
      href: "admin/tag",
    },
    {
      title: "社交媒体",
      description: "管理所有社交媒体",
      href: "admin/social",
    },
    {
      title: "关于我们",
      description: "管理所有关于我们",
      href: "admin/about",
    },
    {
      title: "合作伙伴",
      description: "管理合作伙伴",
      href: "admin/partners",
    },
    {
      title: "菜单管理",
      description: "管理网站导航菜单",
      href: "admin/nav",
    },
  ];

  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold  mb-8">管理面板</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl">
          {data.map((item) => (
            <Link
              key={item.href}
              className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
              href={item.href}
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold  mb-2">{item.title}</h3>
                <p className=" text-sm">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AuthWrapper>
  );
}

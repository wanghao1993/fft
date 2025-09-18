import { Link } from "@/i18n/navigation";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function AdminBlogPage() {
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold  mb-8">管理面板</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl">
          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"admin/blog/list"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">博客</h3>
              <p className=" text-sm">管理所有博客文章</p>
            </div>
          </Link>

          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"admin/video"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">视频</h3>
              <p className=" text-sm">视频管理</p>
            </div>
          </Link>
          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"admin/video-resource"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">Youtube视频来源</h3>
              <p className=" text-sm">视频抓取资源管理</p>
            </div>
          </Link>

          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"admin/news"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">新闻/快讯</h3>
              <p className=" text-sm">新闻/快讯管理</p>
            </div>
          </Link>

          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"admin/news-resource"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">新闻来源</h3>
              <p className=" text-sm">新闻抓取资源管理</p>
            </div>
          </Link>

          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"/admin/tag"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">标签管理</h3>
              <p className=" text-sm">管理系统标签</p>
            </div>
          </Link>

          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"/admin/social"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">社交媒体</h3>
              <p className=" text-sm">管理社交媒体</p>
            </div>
          </Link>

          <Link
            className="p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-primary"
            href={"/admin/about"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold  mb-2">关于我们</h3>
              <p className=" text-sm">管理关于我们</p>
            </div>
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

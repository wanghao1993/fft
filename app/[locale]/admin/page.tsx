import { Link } from "@/i18n/navigation";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function AdminBlogPage() {
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10 px-4 py-8 md:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">管理面板</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl">
          <Link
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            href={"admin/blog/list"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">博客</h3>
              <p className="text-gray-600 text-sm">管理所有博客文章</p>
            </div>
          </Link>

          <Link
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            href={"admin/video"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">视频</h3>
              <p className="text-gray-600 text-sm">视频管理</p>
            </div>
          </Link>
          <Link
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            href={"admin/video-resource"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Youtube视频来源
              </h3>
              <p className="text-gray-600 text-sm">视频抓取资源管理</p>
            </div>
          </Link>

          <Link
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            href={"admin/news"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                新闻/快讯
              </h3>
              <p className="text-gray-600 text-sm">新闻/快讯管理</p>
            </div>
          </Link>

          <Link
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            href={"admin/news-resource"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                新闻来源
              </h3>
              <p className="text-gray-600 text-sm">新闻抓取资源管理</p>
            </div>
          </Link>

          <Link
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
            href={"/admin/tag"}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                标签管理
              </h3>
              <p className="text-gray-600 text-sm">管理系统标签</p>
            </div>
          </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}

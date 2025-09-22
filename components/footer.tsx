import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";

import { getSocials } from "@/service/module/social";
import { socialIcons } from "@/config/socialIcons";
import { Link } from "@/i18n/navigation";
export default async function Footer() {
  const list = await getSocials();
  const isActiveList = list.filter((item) => item.isActive);

  return (
    <footer className="bg-default-100 border-t border-divider py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-default-500">
            © 2025 Future Frontier. 保留所有权利。
          </div>

          <div className="flex gap-5 items-center">
            {isActiveList.map((item) =>
              item.url.startsWith("http") ? (
                <a
                  key={item.id}
                  href={item.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {socialIcons[item.platform]}
                </a>
              ) : (
                <div key={item.id}>
                  <Tooltip
                    content={
                      <a href={`mailto:${item.url}`}>Send to: {item.url}</a>
                    }
                  >
                    {socialIcons[item.platform]}
                  </Tooltip>
                </div>
              )
            )}
            <Link
              href="https://www.xiaoyuzhoufm.com/podcast/677b31d86a83e4baba4beef2"
              target="_blank"
            >
              <Image
                alt="小宇宙"
                height={25}
                src="/social-icons/xiaoyuzhou.png"
                width={25}
              />
            </Link>
          </div>

          {/* <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-default-500 hover:text-primary transition-colors duration-200"
              >
                服务条款
              </a>
              <a
                href="#"
                className="text-default-500 hover:text-primary transition-colors duration-200"
              >
                隐私政策
              </a>
              <a
                href="#"
                className="text-default-500 hover:text-primary transition-colors duration-200"
              >
                免责声明
              </a>
            </div> */}
        </div>
      </div>
    </footer>
  );
}

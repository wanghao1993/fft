"use client";
import { X, Linkedin, Mail, Send, Youtube, Rss } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = [
    {
      title: "内容分类",
      links: [
        { name: "最新快讯", href: "#news" },
        { name: "深度分析", href: "#depth" },
        { name: "原创内容", href: "#original" },
        { name: "视频内容", href: "#videos" },
      ],
    },
    {
      title: "服务项目",
      links: [
        { name: "Web3策略", href: "#services" },
        { name: "媒体公关", href: "#services" },
        { name: "技术开发", href: "#services" },
        { name: "品牌设计", href: "#services" },
      ],
    },
    {
      title: "关于我们",
      links: [
        { name: "团队介绍", href: "#about" },
        { name: "合作伙伴", href: "#partners" },
        { name: "媒体报道", href: "#" },
        { name: "加入我们", href: "#" },
      ],
    },
    {
      title: "联系方式",
      links: [
        { name: "商务合作", href: "#contact" },
        { name: "媒体咨询", href: "#contact" },
        { name: "投稿建议", href: "#contact" },
        { name: "技术支持", href: "#contact" },
      ],
    },
  ];

  const socialLinks = [
    { name: "X", icon: X, href: "#", color: "hover:text-primary" },
    { name: "Telegram", icon: Send, href: "#", color: "hover:text-primary" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-primary",
    },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
    { name: "RSS", icon: Rss, href: "#", color: "hover:text-orange-500" },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:contact@futurefrontier.ai",
      color: "hover:text-green-500",
    },
  ];

  const quickLinks = [
    "Web3",
    "Crypto",
    "DeFi",
    "NFT",
    "Layer2",
    "RWA",
    "Stablecoin",
    "AI",
  ];

  return (
    <footer className="bg-default-100 border-t border-divider">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-12 border-b border-divider"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-foreground mb-2">
              订阅 Future Frontier 资讯
            </h3>
            <p className="text-default-500">
              获取最新的 Web3、加密货币和 AI 技术资讯
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="输入您的邮箱"
              className="flex-1"
              variant="bordered"
            />
            <Button color="primary">立即订阅</Button>
          </div>
        </motion.div> */}

        {/* Main Footer Content */}
        {/* <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-foreground">FFT</h3>
                <span className="text-sm text-default-500">FutureFrontier</span>
              </div>
              <p className="text-default-500 mb-6 max-w-sm">
                聚焦 Web3/Crypto/RWA/Stablecoin/AI
                等新金融与未来科技融合赛道，为行业提供深度洞察与专业服务。
              </p>

              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.name}
                      isIconOnly
                      variant="bordered"
                      size="sm"
                      className={`${social.color} transition-colors`}
                      as="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {quickLinks.map((topic) => (
                  <a
                    key={topic}
                    href={`#${topic.toLowerCase()}`}
                    className="text-xs text-default-500 hover:text-primary transition-colors px-2 py-1 rounded bg-default-100 hover:bg-primary/10"
                  >
                    #{topic}
                  </a>
                ))}
              </div>
            </motion.div>

            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-medium text-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-default-500 hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* <Divider /> */}

        {/* Bottom Footer */}
        <motion.div
          className="py-6"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-default-500">
              © 2025 Future Frontier. 保留所有权利。
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
        </motion.div>
      </div>
    </footer>
  );
}

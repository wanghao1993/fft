import { getTranslations } from "next-intl/server";

export type SiteConfig = typeof siteConfig;

// 默认配置（保持向后兼容性）
export const siteConfig = {
  name: "FutureFrontier",
  description: "FutureFrontier",
  navItems: [
    {
      href: "#quick-news",
      label: "快讯",
    },
    {
      href: "#hot-news",
      label: "热点新闻",
    },
    {
      href: "#deep",
      label: "深度",
    },
    {
      href: "#podcast",
      label: "播客",
    },
    {
      href: "#videos",
      label: "视频",
    },
    {
      href: "#interviews",
      label: "人物专访",
    },
    {
      href: "#about-us",
      label: "关于我们",
    },
  ],
  navMenuItems: [
    {
      href: "#quick-news",
      label: "快讯",
    },
    {
      href: "#hot-news",
      label: "热点新闻",
    },
    {
      href: "#deep",
      label: "深度",
    },
    {
      href: "#podcast",
      label: "播客",
    },
    {
      href: "#videos",
      label: "视频",
    },
    {
      href: "#interviews",
      label: "人物专访",
    },
    {
      href: "#about-us",
      label: "关于我们",
    },
  ],
  tags: [
    {
      label: "首页",
      value: "/",
    },
    {
      label: "比特币",
      value: "Bitcoin",
    },
    {
      label: "以太坊",
      value: "Ethereum",
    },
    {
      label: "ETF",
      value: "ETF",
    },
    {
      label: "Vitalik",
      value: "Vitalik",
    },
    {
      label: "Solana",
      value: "Solana",
    },
    {
      label: "Ton",
      value: "Ton",
    },
    {
      label: "NTF",
      value: "NTF",
    },
    {
      label: "Defi",
      value: "Defi",
    },
    {
      label: "香港",
      value: "Hk",
    },
    {
      label: "新加坡",
      value: "Singapore",
    },
    {
      label: "挖矿",
      value: "挖矿",
    },

    {
      label: "深度",
      value: "deep",
    },
    {
      label: "联系我们",
      value: "contractus",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

// 国际化配置获取函数
export async function getLocalizedSiteConfig() {
  const t = await getTranslations("Site");

  return {
    name: t("name"),
    description: t("description"),
    navItems: [
      {
        href: "/#quick-news",
        label: t("navItems.quickNews"),
      },
      {
        href: "/#hot-news",
        label: t("navItems.hotNews"),
      },
      {
        href: "/#in-depth",
        label: t("navItems.deep"),
      },
      {
        href: "/#podcasts",
        label: t("navItems.podcast"),
      },
      {
        href: "/#videos",
        label: t("navItems.videos"),
      },
      {
        href: "/#interviews",
        label: t("navItems.interviews"),
      },
      {
        href: "/#about-us",
        label: t("navItems.company"),
        children: [
          {
            href: "/about",
            label: t("navItems.aboutUs"),
          },
        ],
      },
    ],
    navMenuItems: [
      {
        href: "/#quick-news",
        label: t("navItems.quickNews"),
      },
      {
        href: "/#hot-news",
        label: t("navItems.hotNews"),
      },
      {
        href: "/#in-depth",
        label: t("navItems.deep"),
      },
      {
        href: "/#podcasts",
        label: t("navItems.podcast"),
      },
      {
        href: "/#videos",
        label: t("navItems.videos"),
      },
      {
        href: "/#interviews",
        label: t("navItems.interviews"),
      },
      {
        href: "/#about-us",
        label: t("navItems.aboutUs"),
      },
    ],
    uiText: {
      filtering: t("ui.filtering"),
      more: t("ui.more"),
    },
    links: {
      github: "https://github.com/heroui-inc/heroui",
      twitter: "https://twitter.com/hero_ui",
      docs: "https://heroui.com",
      discord: "https://discord.gg/9b6yyZKmH4",
      sponsor: "https://patreon.com/jrgarciadev",
    },
  };
}

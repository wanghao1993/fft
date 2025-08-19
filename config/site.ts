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
        href: "#quick-news",
        label: t("navItems.quickNews"),
      },
      {
        href: "#hot-news",
        label: t("navItems.hotNews"),
      },
      {
        href: "#deep",
        label: t("navItems.deep"),
      },
      {
        href: "#podcast",
        label: t("navItems.podcast"),
      },
      {
        href: "#videos",
        label: t("navItems.videos"),
      },
      {
        href: "#interviews",
        label: t("navItems.interviews"),
      },
      {
        href: "#about-us",
        label: t("navItems.aboutUs"),
      },
    ],
    navMenuItems: [
      {
        href: "#quick-news",
        label: t("navItems.quickNews"),
      },
      {
        href: "#hot-news",
        label: t("navItems.hotNews"),
      },
      {
        href: "#deep",
        label: t("navItems.deep"),
      },
      {
        href: "#podcast",
        label: t("navItems.podcast"),
      },
      {
        href: "#videos",
        label: t("navItems.videos"),
      },
      {
        href: "#interviews",
        label: t("navItems.interviews"),
      },
      {
        href: "#about-us",
        label: t("navItems.aboutUs"),
      },
    ],
    tags: [
      {
        label: t("tags.home"),
        value: "/",
      },
      {
        label: t("tags.bitcoin"),
        value: "Bitcoin",
      },
      {
        label: t("tags.ethereum"),
        value: "Ethereum",
      },
      {
        label: t("tags.etf"),
        value: "ETF",
      },
      {
        label: t("tags.vitalik"),
        value: "Vitalik",
      },
      {
        label: t("tags.solana"),
        value: "Solana",
      },
      {
        label: t("tags.ton"),
        value: "Ton",
      },
      {
        label: t("tags.nft"),
        value: "NFT",
      },
      {
        label: t("tags.defi"),
        value: "DeFi",
      },
      {
        label: t("tags.hongKong"),
        value: "Hk",
      },
      {
        label: t("tags.singapore"),
        value: "Singapore",
      },
      {
        label: t("tags.mining"),
        value: "挖矿",
      },
      {
        label: t("tags.deep"),
        value: "deep",
      },
      {
        label: t("tags.contactUs"),
        value: "contractus",
      },
    ],
    // 扩展的标签配置，用于Tags组件
    extendedTags: [
      { id: "home", label: t("tags.home"), category: "main" },
      { id: "bitcoin", label: t("tags.bitcoin"), category: "crypto" },
      { id: "ethereum", label: t("tags.ethereum"), category: "crypto" },
      { id: "etf", label: t("tags.etf"), category: "finance" },
      { id: "sec", label: t("ui.sec"), category: "regulation" },
      { id: "vitalik", label: t("tags.vitalik"), category: "people" },
      { id: "solana", label: t("tags.solana"), category: "crypto" },
      { id: "ton", label: t("tags.ton"), category: "crypto" },
      { id: "arthur-hayes", label: t("ui.arthurHayes"), category: "people" },
      { id: "nft", label: t("tags.nft"), category: "crypto" },
      { id: "gaming", label: t("ui.gaming"), category: "sector" },
      { id: "defi", label: t("tags.defi"), category: "crypto" },
      { id: "rwa", label: t("ui.rwa"), category: "crypto" },
      { id: "stablecoin", label: t("ui.stablecoin"), category: "crypto" },
      { id: "ai", label: t("ui.ai"), category: "tech" },
      { id: "layer2", label: t("ui.layer2"), category: "crypto" },
      { id: "hongkong", label: t("tags.hongKong"), category: "region" },
      { id: "singapore", label: t("tags.singapore"), category: "region" },
      { id: "japan", label: t("ui.japan"), category: "region" },
      { id: "korea", label: t("ui.korea"), category: "region" },
      { id: "usa", label: t("ui.usa"), category: "region" },
      { id: "europe", label: t("ui.europe"), category: "region" },
      { id: "mining", label: t("tags.mining"), category: "sector" },
      { id: "analysis", label: t("tags.deep"), category: "content" },
      { id: "education", label: t("ui.education"), category: "content" },
      { id: "podcast", label: t("navItems.podcast"), category: "content" },
      { id: "video", label: t("navItems.videos"), category: "content" },
      { id: "app", label: t("ui.appReading"), category: "tools" },
      { id: "contact", label: t("tags.contactUs"), category: "main" },
    ],
    categories: [
      { key: "all", label: t("categories.all") },
      { key: "main", label: t("categories.main") },
      { key: "crypto", label: t("categories.crypto") },
      { key: "finance", label: t("categories.finance") },
      { key: "regulation", label: t("categories.regulation") },
      { key: "people", label: t("categories.people") },
      { key: "sector", label: t("categories.sector") },
      { key: "region", label: t("categories.region") },
      { key: "content", label: t("categories.content") },
      { key: "tech", label: t("categories.tech") },
      { key: "tools", label: t("categories.tools") },
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

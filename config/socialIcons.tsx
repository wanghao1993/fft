export type enumPlatform =
  | "email"
  | "twitter"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "twitch"
  | "discord"
  | "telegram"
  | "wechat"
  | "weibo"
  | "bilibili";
export const socialIcons: Record<enumPlatform, string> = {
  email: "/images/email.png",
  twitter: "/images/x.svg",
  facebook: "/images/facebook.svg",
  instagram: "/images/ins.png",
  linkedin: "/images/linkedin.png",
  youtube: "/images/youtube.png",
  tiktok: "/images/tiktok.png",
  twitch: "/images/twitch.png",
  discord: "/images/discord.svg",
  telegram: "/images/tg.png",
  wechat: "/images/wechat.png",
  weibo: "/images/weibo.png",
  bilibili: "/images/bilibili.jpeg",
};

import { ReactNode } from "react";
import { TwitterIcon } from "@/components/icons";
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
export const socialIcons: Record<enumPlatform, ReactNode> = {
  email: (
    <img alt={"email"} style={{ height: "26px" }} src={"/images/email.png"} />
  ),
  twitter: <TwitterIcon />,
  facebook: (
    <img
      alt={"facebook"}
      style={{ height: "28px" }}
      src={"/images/facebook.svg"}
    />
  ),
  instagram: (
    <img alt={"instagram"} style={{ height: "28px" }} src={"/images/ins.png"} />
  ),
  linkedin: (
    <img
      alt={"linkedin"}
      style={{ height: "24px" }}
      src={"/images/linkedin.png"}
    />
  ),
  youtube: (
    <img
      alt={"tiktok"}
      style={{ height: "24px" }}
      src={"/images/youtube.png"}
    />
  ),
  tiktok: (
    <img alt={"tiktok"} style={{ height: "24px" }} src={"/images/tiktok.ico"} />
  ),
  twitch: (
    <img alt={"twitch"} style={{ height: "24px" }} src={"/images/twitch.png"} />
  ),
  discord: (
    <img
      alt={"discord"}
      style={{ height: "24px" }}
      src={"/images/discord.svg"}
    />
  ),
  telegram: (
    <img alt={"telegram"} style={{ height: "24px" }} src={"/images/tg.png"} />
  ),
  wechat: (
    <img alt={"wechat"} style={{ height: "24px" }} src={"/images/wechat.png"} />
  ),
  weibo: (
    <img alt={"weibo"} style={{ height: "24px" }} src={"/images/weibo.png"} />
  ),
  bilibili: (
    <img
      alt={"bilibili"}
      style={{ height: "24px" }}
      src={"/images/bilibili.jpeg"}
    />
  ),
};
